import { useContext } from "react";
import ImMoveUp from "@meronex/icons/im/ImMoveUp";
import ImMoveDown from "@meronex/icons/im/ImMoveDown";
import MdLibraryAdd from "@meronex/icons/md/MdLibraryAdd";
import MdDeleteForever from "@meronex/icons/md/MdDeleteForever";
import MdRemoveCircle from "@meronex/icons/md/MdRemoveCircle";

import JSONEditor from "../../atoms/JSONEditor";
import EditContext from "../../templates/PostEdit/EditContext";
import ChampionChangeDev from "../../molecules/ChampionChange/edit/ChampionChangeDev";

import { arrayMove } from "../../../core/helpers/move-array";
import { defaultAbilityChange } from "./helpers";

import { EditChampionChangeProps } from "./interfaces";
import styles from "./styles.module.scss";

const EditChampionChange = (props: EditChampionChangeProps) => {
  const {
    change,
    setChange,
    championSectionIndex,
    championChangeIndex,
  } = props;
  const { json, postState, setPostState } = useContext(EditContext);

  const championInfo = {
    name: change.name,
    resume: change.resume,
    context: change.context,
    goal: change.goal,
  };

  const changes = change.changes;

  function handleChampion(newInfo: Omit<ChampionChange, "changes">) {
    setChange({ ...newInfo, changes: [...changes] });
  }

  function handleChange() {
    const newChanges = [...changes];
    setChange({ ...championInfo, changes: newChanges });
  }

  function handleMove(currentIndex: number, direction: "up" | "down") {
    let newIndex;

    if (currentIndex > 0 && direction === "up") {
      newIndex = currentIndex - 1;
    } else if (currentIndex < changes.length - 1 && direction === "down") {
      newIndex = currentIndex + 1;
    } else {
      return;
    }

    const newArray = arrayMove([...changes], currentIndex, newIndex);

    setChange({
      changes: newArray,
      ...championInfo,
    });
  }

  function handleAdd(index: number) {
    const newArray = [...changes];
    newArray.splice(index + 1, 0, defaultAbilityChange);

    setChange({ ...championInfo, changes: newArray });
  }

  function handleDelete(index: number) {
    const newArray = [...changes];
    newArray.splice(index, 1);

    setChange({ ...championInfo, changes: [...newArray] });
  }

  function handleDeleteChampion(champion: string) {
    if (postState) {
      const champIndex = postState.sections[
        championSectionIndex
      ].champions?.findIndex((champ) => champ.name === champion);

      const newState = { ...postState };

      if (champIndex || champIndex === 0)
        newState.sections[championSectionIndex].champions?.splice(
          champIndex,
          1
        );

      setPostState(newState);
    }
  }

  return (
    <div className={styles["edit-champion-change__container"]}>
      <div className={styles["edit-champion-change__controls"]}>
        <div
          onClick={() => handleDeleteChampion(championInfo.name)}
          className={styles["edit-champion-change__controls__delete"]}
        >
          <MdRemoveCircle />
        </div>
      </div>

      {!json ? (
        <ChampionChangeDev
          championInfo={championInfo}
          change={{ ...championInfo, changes }}
          championSectionIndex={championSectionIndex}
          championChangeIndex={championChangeIndex}
        />
      ) : (
        <div className={styles["edit-champion-change__test__jsons"]}>
          <JSONEditor
            key={`jsonchange-info`}
            json={championInfo}
            setJson={(value) =>
              handleChampion(value as Omit<ChampionChange, "changes">)
            }
          />
          {changes.map((change, i) => (
            <>
              <div
                key={`jsonchange-${i}-${championInfo.name}`}
                className={styles["edit-champion-change__change"]}
              >
                <div className={styles["edit-champion-change__change__move"]}>
                  {i !== 0 && <ImMoveUp onClick={() => handleMove(i, "up")} />}
                  {i !== changes.length - 1 && (
                    <ImMoveDown onClick={() => handleMove(i, "down")} />
                  )}
                  <MdDeleteForever
                    className={styles["edit-champion-change__change__delete"]}
                    onClick={() => handleDelete(i)}
                  />
                </div>
                <JSONEditor
                  key={`jsonchange-${i}`}
                  json={change}
                  setJson={() => handleChange()}
                />
              </div>
              <button
                className={styles["edit-champion-change__add-change"]}
                onClick={() => handleAdd(i)}
              >
                <MdLibraryAdd />
              </button>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditChampionChange;
