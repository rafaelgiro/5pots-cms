import nestedProperty from "nested-property";

import Row from "./Row";

import { JSONEditorProps, AnyJson } from "./interfaces";

import debouce from "../../../core/helpers/debouce";
import { arrayMove } from "../../../core/helpers/move-array";

import { sanitizeJSON, defaultChampionChange } from "./helpers";
import styles from "./styles.module.scss";

const JSONEditor = (props: JSONEditorProps) => {
  const { json, setJson } = props;

  function handleValue(path: string[], newValue: string) {
    const breadcrumb = path.join(".");
    const newJson = json;
    nestedProperty.set(newJson, breadcrumb, newValue);
    setJson({ ...newJson });
  }

  function handleKey(path: string[], newKey: string) {
    const breadcrumb = path.join(".");
    const currentValue = nestedProperty.get(json, breadcrumb);

    const auxJson = json;
    nestedProperty.set(auxJson, breadcrumb, null);

    const newJson = sanitizeJSON(auxJson);

    const newPath = [...path];
    newPath[path.length - 1] = newKey;
    const newBreadcrumb = newPath.join(".");

    nestedProperty.set(newJson, newBreadcrumb, currentValue);

    setJson({ ...newJson });
  }

  function checkArrayMovement(
    path: string[],
    currentIndex: number,
    direction: "up" | "down"
  ) {
    const breadcrumb = [...path].splice(-1, 1).join(".");
    const currentArray = nestedProperty.get(json, breadcrumb);

    if (currentIndex > 0 && direction === "up") return true;

    if (currentIndex < currentArray.length - 1 && direction === "down")
      return true;

    return false;
  }

  function handleMove(
    path: string[],
    currentIndex: number,
    direction: "up" | "down"
  ) {
    const breadcrumb = [...path].splice(-1, 1).join(".");
    const currentArray = nestedProperty.get(json, breadcrumb);

    let newIndex: number;

    if (currentIndex > 0 && direction === "up") {
      newIndex = currentIndex - 1;
    } else if (currentIndex < currentArray.length - 1 && direction === "down") {
      newIndex = currentIndex + 1;
    } else {
      return;
    }

    const newArray = arrayMove(currentArray, currentIndex, newIndex);
    const newJson = json;
    nestedProperty.set(newJson, breadcrumb, newArray);

    setJson({ ...newJson });
  }

  function handleAdd() {
    const newJson = json;
    const currentArray = json.blocks;
    const newArray = [...currentArray];
    newArray.push(defaultChampionChange);

    newJson.blocks = newArray;

    setJson({ ...newJson });
  }

  function handleDelete(index: number) {
    const currentArray = json.blocks;

    const newJson = json;
    const newArray = [...currentArray];
    newArray.splice(index, 1);

    newJson.blocks = newArray;
    setJson({ ...newJson });
  }

  const getValue = (path: string[]) => nestedProperty.get(json, path.join("."));

  function renderObject(json: AnyJson, path: string[]) {
    return Object.keys(json).map((key) => {
      return (
        <Row
          jsonKey={key}
          key={key}
          value={json[key]}
          path={path}
          renderObject={renderObject}
          handleValue={debouce(handleValue, 400)}
          handleKey={debouce(handleKey, 400)}
          getValue={getValue}
          handleMove={handleMove}
          checkArrayMovement={checkArrayMovement}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
        />
      );
    });
  }

  return <div className={styles["json-editor"]}>{renderObject(json, [])}</div>;
};

export default JSONEditor;
