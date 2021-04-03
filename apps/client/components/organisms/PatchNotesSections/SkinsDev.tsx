import Section from "../Section";
import SectionIcon from "../../atoms/Icons/SectionIcon";
import SectionTitle from "../../atoms/SectionTitle";
import styles from "../../templates/PostView/styles.module.scss";
import SkinDisplayEdit from "../../molecules/SkinDisplay/edit/SkinDisplayEdit";

import { SkinsSectionProps } from "./interfaces";

const SkinsSectionDev = (props: SkinsSectionProps) => {
  const { skinsSection } = props;
  return (
    <Section className={styles["post-section"]}>
      <SectionTitle title="skins">
        <SectionIcon section="skins" />
      </SectionTitle>
      {skinsSection.map((skin) => (
        <SkinDisplayEdit {...skin} key={skin.id} />
      ))}
    </Section>
  );
};

export default SkinsSectionDev;
