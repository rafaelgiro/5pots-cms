import edjsHTML from "editorjs-html";
import { useMemo } from "react";
import { GeneralSectionProps } from "./interfaces";

import styles from "./styles.module.scss";

const GeneralSection = (props: GeneralSectionProps) => {
  const { content } = props;
  const edjsParser = edjsHTML();
  const html = useMemo(() => edjsParser.parse(content), [content]);

  return (
    <div
      className={styles.general}
      dangerouslySetInnerHTML={{ __html: html.join("") }}
    />
  );
};

export default GeneralSection;
