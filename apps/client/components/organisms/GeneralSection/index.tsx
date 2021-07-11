import edjsHTML from "editorjs-html";
import { useMemo } from "react";
import { customEmbed, customRaw } from "./helpers";
import { GeneralSectionProps } from "./interfaces";

import Section from "../Section";
import SectionTitle from "../../atoms/SectionTitle";
import SectionIcon from "../../atoms/Icons/SectionIcon";

import styles from "./styles.module.scss";

const GeneralSection = (props: GeneralSectionProps) => {
  const { content, title } = props;
  const edjsParser = edjsHTML({ embed: customEmbed, raw: customRaw });
  const html = useMemo(() => edjsParser.parse(content), [content]);

  return (
    <Section className={styles["post-section"]}>
      <SectionTitle title={title}>
        <SectionIcon section="normal" />
      </SectionTitle>
      <div
        className={styles.general}
        dangerouslySetInnerHTML={{ __html: html.join("") }}
      />
    </Section>
  );
};

export default GeneralSection;
