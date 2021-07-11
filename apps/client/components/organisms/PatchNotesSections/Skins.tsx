import SectionIcon from "../../atoms/Icons/SectionIcon";
import SectionTitle from "../../atoms/SectionTitle";
import Section from "../Section";

import styles from "../../templates/PostView/styles.module.scss";

import SkinDisplay from "../../molecules/SkinDisplay";
import { SkinsSectionProps } from "./interfaces";

const SkinsSection = (props: SkinsSectionProps) => {
  const { skinsSection, title } = props;
  return (
    <Section className={styles["post-section"]}>
      <SectionTitle title={title}>
        <SectionIcon section="skins" />
      </SectionTitle>
      {skinsSection.map((skin) => (
        <SkinDisplay {...skin} key={skin.id} />
      ))}
    </Section>
  );
};

export default SkinsSection;
