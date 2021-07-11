import SectionIcon from "../../atoms/Icons/SectionIcon";
import SectionTitle from "../../atoms/SectionTitle";
import ChampionChange from "../../molecules/ChampionChange";
import Section from "../Section";

import { ChampionsSectionProps } from "./interfaces";
import styles from "../../templates/PostView/styles.module.scss";

const ChampionsSection = (props: ChampionsSectionProps) => {
  const { championSection, champions, title } = props;

  return (
    <Section className={styles["post-section"]}>
      <SectionTitle title={title}>
        <SectionIcon section="champions" />
      </SectionTitle>
      {championSection &&
        championSection.map((change, i) => {
          return (
            <ChampionChange
              key={`champion-${change.name}-change-${i}`}
              change={change}
              champion={
                champions.filter(
                  (champ) => champ.championName === change.name
                )[0]
              }
            />
          );
        })}
    </Section>
  );
};

export default ChampionsSection;
