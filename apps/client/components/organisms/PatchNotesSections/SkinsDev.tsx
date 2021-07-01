import Section from "../Section";
import SectionIcon from "../../atoms/Icons/SectionIcon";
import SectionTitle from "../../atoms/SectionTitle";
import SkinDisplayEdit from "../../molecules/SkinDisplay/edit/SkinDisplayEdit";
import AddNewSkin from "./AddNewSkin";

import styles from "../../templates/PostView/styles.module.scss";

import { SkinsSectionProps } from "./interfaces";

const SkinsSectionDev = (props: SkinsSectionProps) => {
  const { skinsSection } = props;
  return (
    <Section className={styles["post-section"]}>
      <SectionTitle title="skins">
        <SectionIcon section="skins" />
      </SectionTitle>
      {skinsSection.map((skin, i) => (
        <SkinDisplayEdit {...skin} key={skin.id} index={i} />
      ))}
      <AddNewSkin />
    </Section>
  );
};

export default SkinsSectionDev;
