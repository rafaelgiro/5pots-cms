import { useState } from "react";
import clsx from "clsx";
import MdArrowDropDown from "@meronex/icons/md/MdArrowDropDown";
import ImMoveUp from "@meronex/icons/im/ImMoveUp";
import ImMoveDown from "@meronex/icons/im/ImMoveDown";
import MdAddBox from "@meronex/icons/md/MdAddBox";
import MdBackspace from "@meronex/icons/md/MdBackspace";

import Key from "./Key";
import Value from "./Value";

import { RowProps } from "./interfaces";
import styles from "./styles.module.scss";
import Collapse from "../Collapse";

const Row = (props: RowProps) => {
  const {
    jsonKey,
    value,
    renderObject,
    path,
    handleValue,
    getValue,
    handleKey,
    handleMove,
    checkArrayMovement,
    handleAdd,
    handleDelete,
  } = props;
  const [collapse, setCollapse] = useState(true);
  const isObject = typeof value === "object";
  const isArrayItem = !isNaN(Number(jsonKey));
  const isArray = isObject ? Object.keys(value)[0] === "0" : false;
  const breadcrumb = [...path, jsonKey];

  const rowClass = clsx(
    styles["json-editor__row"],
    isObject && styles["json-editor__row--object"]
  );

  const keyValueClass = clsx(
    styles["json-editor__row__key-value"],
    collapse && styles["json-editor__row__key-value--open"]
  );

  return (
    <div className={rowClass} key={jsonKey}>
      <div className={keyValueClass}>
        {isObject && (
          <button onClick={() => setCollapse(!collapse)}>
            <MdArrowDropDown />
          </button>
        )}
        <Key path={breadcrumb} jsonKey={jsonKey} handleKey={handleKey} />
        <Value
          value={value}
          path={breadcrumb}
          handleValue={handleValue}
          getValue={getValue}
        />
        {isArrayItem && (
          <div className={styles["json-editor__row__move-array-item"]}>
            {checkArrayMovement(path, Number(jsonKey), "up") && (
              <ImMoveUp
                onClick={() => handleMove(path, Number(jsonKey), "up")}
              />
            )}
            {checkArrayMovement(path, Number(jsonKey), "down") && (
              <ImMoveDown
                onClick={() => handleMove(path, Number(jsonKey), "down")}
              />
            )}
          </div>
        )}
        {isArrayItem && (
          <MdBackspace
            className={styles["json-editor__row__delete-item"]}
            onClick={() => handleDelete(Number(jsonKey))}
          />
        )}
      </div>
      {isObject && (
        <Collapse isOpen={collapse}>
          <div className={styles["json-editor__row__object"]}>
            {renderObject(value, breadcrumb)}
          </div>
        </Collapse>
      )}
      {isArray && (
        <button
          className={styles["json-editor__row__add-item"]}
          onClick={() => handleAdd(path)}
        >
          <MdAddBox />
        </button>
      )}
    </div>
  );
};

export default Row;
