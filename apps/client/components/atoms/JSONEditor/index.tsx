import nestedProperty from "nested-property";

import Row from "./Row";

import { JSONEditorProps, AnyJson } from "./interfaces";

import styles from "./styles.module.scss";
import debouce from "../../../core/helpers/debouce";
import { sanitizeJSON } from "./helpers";

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
        />
      );
    });
  }

  return <div className={styles["json-editor"]}>{renderObject(json, [])}</div>;
};

export default JSONEditor;
