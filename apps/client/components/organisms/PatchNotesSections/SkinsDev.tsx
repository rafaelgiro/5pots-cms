import SectionDev from "../Section/dev";
import SectionIcon from "../../atoms/Icons/SectionIcon";
import SectionTitleDev from "../../atoms/SectionTitle/dev";
import SkinDisplayEdit from "../../molecules/SkinDisplay/edit/SkinDisplayEdit";
import AddNewSkin from "./AddNewSkin";

import styles from "../../templates/PostView/styles.module.scss";

import { SkinsSectionDevProps } from "./interfaces";

const SkinsSectionDev = (props: SkinsSectionDevProps) => {
  const { skinsSection, sectionIndex, title } = props;
  return (
    <SectionDev className={styles["post-section"]} sectionIndex={sectionIndex}>
      <SectionTitleDev title={title} sectionIndex={sectionIndex}>
        <SectionIcon section="skins" />
      </SectionTitleDev>
      {skinsSection.map((skin, i) => (
        <SkinDisplayEdit
          {...skin}
          key={skin.id}
          index={i}
          sectionIndex={sectionIndex}
        />
      ))}
      <AddNewSkin />
    </SectionDev>
  );
};

export default SkinsSectionDev;
