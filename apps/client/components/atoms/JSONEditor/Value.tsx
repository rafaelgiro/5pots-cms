import clsx from "clsx";
import ContentEditable from "react-contenteditable";

import { ValueProps } from "./interfaces";
import styles from "./styles.module.scss";
import { useRef } from "react";

const Value = (props: ValueProps) => {
  const { value, path, handleValue } = props;
  const ref = useRef<HTMLDivElement>(null);

  const isObject = typeof value === "object";
  const isArray = isObject ? Object.keys(value)[0] === "0" : false;
  const isString = typeof value === "string";

  const valueClass = clsx(
    styles["json-editor__value"],
    isObject && styles["json-editor__value--object"],
    isString && styles["json-editor__value--string"],
    isString &&
      value.length > 50 &&
      styles["json-editor__value--string--lengthy"]
  );

  function renderValue() {
    if (isArray) {
      return (
        <>
          Array
          <span className={styles["json-editor__value--size"]}>
            [{value.length}]
          </span>
        </>
      );
    }

    return (
      <>
        Object
        <span className={styles["json-editor__value--size"]}>
          {`{${Object.keys(value).length}}`}
        </span>
      </>
    );
  }

  if (typeof value === "string")
    return (
      <ContentEditable
        tagName="div"
        innerRef={ref}
        html={value}
        onChange={(e) => handleValue(path, e.target.value)}
        className={valueClass}
      />
    );

  return <div className={valueClass}>{renderValue()}</div>;
};

export default Value;
