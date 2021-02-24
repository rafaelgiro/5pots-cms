import { useRef } from "react";
import ContentEditable from "react-contenteditable";
import { KeyProps } from "./interfaces";
import styles from "./styles.module.scss";

const Key = (props: KeyProps) => {
  const { jsonKey, handleKey, path } = props;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <ContentEditable
      tagName="div"
      innerRef={ref}
      html={jsonKey}
      onChange={(e) => handleKey(path, e.target.value)}
      className={styles["json-editor__key"]}
    />
  );
};

export default Key;
