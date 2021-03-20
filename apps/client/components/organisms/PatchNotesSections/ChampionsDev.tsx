import { useContext, useMemo } from "react";
import MdNoteAdd from "@meronex/icons/md/MdNoteAdd";

import Section from "../Section";
import EditChampionChange from "../EditChampionChange";
import SectionIcon from "../../atoms/Icons/SectionIcon";
import Typography from "../../atoms/Typography";
import SectionTitle from "../../atoms/SectionTitle";
import SimpleSelect from "../../atoms/SimpleSelect";

import EditContext from "../../templates/PostEdit/EditContext";

import { ChampionSectionDevProps } from "./interfaces";

import viewStyles from "../../templates/PostView/styles.module.scss";
import styles from "./styles.module.scss";
import ConvertChange from "../../molecules/ConvertChange";

const ChampionsSectionDev = (props: ChampionSectionDevProps) => {
  const { championSection, allChampions } = props;
  const {
    handleNewChampion,
    handleChampionChange,
    handleNewFromPaste,
  } = useContext(EditContext);

  const championOptions = useMemo(() => {
    return allChampions.map((champion) => {
      return { value: champion, label: champion };
    });
  }, [allChampions]);

  return (
    <Section className={viewStyles["post-section"]}>
      <SectionTitle title="Campeões">
        <SectionIcon section="champions" />
      </SectionTitle>
      {championSection.map((section) => (
        <EditChampionChange
          key={`champ-edit-${section.name}`}
          change={section}
          setChange={handleChampionChange}
        />
      ))}

      <div className={styles["champions-dev__add-champion"]}>
        <ConvertChange handleNewFromPaste={handleNewFromPaste} />
        <div className={styles["champions-dev__add-champion__manual"]}>
          <div>
            <Typography component="p" variant="sub">
              Adicionar novo boneco
            </Typography>
            <SimpleSelect
              options={championOptions}
              handleChange={handleNewChampion}
              searchable
            />
          </div>
          <MdNoteAdd onClick={handleNewChampion} />
        </div>
      </div>
    </Section>
  );
};

export default ChampionsSectionDev;
