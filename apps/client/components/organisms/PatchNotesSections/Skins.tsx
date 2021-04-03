import SectionIcon from "../../atoms/Icons/SectionIcon";
import SectionTitle from "../../atoms/SectionTitle";
import Section from "../Section";

import styles from "../../templates/PostView/styles.module.scss";

import skins from "./skins.json";
import SkinDisplay from "../../molecules/SkinDisplay";

const SkinsSection = () => {
  return (
    <Section className={styles["post-section"]}>
      <SectionTitle title="skins">
        <SectionIcon section="skins" />
      </SectionTitle>
      {skins.map((skin, i) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <SkinDisplay {...skins[i]} key={skin.id} />
      ))}
    </Section>
  );
};

export default SkinsSection;
