import { useContext, useMemo } from "react";
import MdNoteAdd from "@meronex/icons/md/MdNoteAdd";

import SectionDev from "../Section/dev";
import EditChampionChange from "../EditChampionChange";
import SectionIcon from "../../atoms/Icons/SectionIcon";
import Typography from "../../atoms/Typography";
import SectionTitleEdit from "../../atoms/SectionTitle/dev";
import SimpleSelect from "../../atoms/SimpleSelect";
import ConvertChange from "../../molecules/ConvertChange";

import EditContext from "../../templates/PostEdit/EditContext";

import { defaultChampionChange } from "../../templates/PostEdit/helpers";
import { ChampionSectionDevProps } from "./interfaces";

import viewStyles from "../../templates/PostView/styles.module.scss";
import styles from "./styles.module.scss";

const ChampionsSectionDev = (props: ChampionSectionDevProps) => {
  const {
    championSection,
    allChampions,
    sectionIndex: championSectionIndex,
    title,
  } = props;
  const { postState, setPostState } = useContext(EditContext);

  const championOptions = useMemo(() => {
    return allChampions.map((champion) => {
      return { value: champion, label: champion };
    });
  }, [allChampions]);

  function handleChampionChange(newChange: ChampionChange) {
    if (postState) {
      const champIndex = postState.sections[
        championSectionIndex
      ].champions?.findIndex((champ) => champ.name === newChange.name);

      const newState = { ...postState };
      if (newState.sections[championSectionIndex].champions && champIndex) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newState.sections[championSectionIndex].champions[
          champIndex
        ] = newChange;
      }

      setPostState(newState);
    }
  }

  function handleNewChampion(champion: string) {
    if (postState?.champions.includes(champion)) return;

    if (postState) {
      const newState = { ...postState };
      newState.sections[championSectionIndex].champions?.push({
        ...defaultChampionChange,
        name: champion,
      });

      setPostState(newState);
    }
  }

  function handleNewFromPaste(championChange: ChampionChange) {
    if (postState?.champions.includes(championChange.name)) return;

    if (postState) {
      const newState = { ...postState };
      newState.sections[championSectionIndex].champions?.push(championChange);
      setPostState(newState);
    }
  }

  return (
    <SectionDev
      className={viewStyles["post-section"]}
      sectionIndex={championSectionIndex}
    >
      <SectionTitleEdit title={title} sectionIndex={championSectionIndex}>
        <SectionIcon section="champions" />
      </SectionTitleEdit>
      {championSection.map((section, i) => (
        <EditChampionChange
          key={`champ-edit-${section.name}`}
          change={section}
          setChange={handleChampionChange}
          championSectionIndex={championSectionIndex}
          championChangeIndex={i}
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
    </SectionDev>
  );
};

export default ChampionsSectionDev;
