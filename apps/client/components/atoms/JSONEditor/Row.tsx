import { useState } from "react";
import clsx from "clsx";
import MdArrowDropDown from "@meronex/icons/md/MdArrowDropDown";

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
  } = props;
  const [collapse, setCollapse] = useState(true);
  const isObject = typeof value === "object";
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
      </div>
      {isObject && (
        <Collapse isOpen={collapse}>
          <div className={styles["json-editor__row__object"]}>
            {renderObject(value, breadcrumb)}
          </div>
        </Collapse>
      )}
    </div>
  );
};

export default Row;
