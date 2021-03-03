/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext, useState } from "react";
import ImMoveUp from "@meronex/icons/im/ImMoveUp";
import ImMoveDown from "@meronex/icons/im/ImMoveDown";
import MdLibraryAdd from "@meronex/icons/md/MdLibraryAdd";
import MdDeleteForever from "@meronex/icons/md/MdDeleteForever";

import BateuNaPortaDaPortaErrada from "../404";
import JSONEditor from "../../components/atoms/JSONEditor";
import ConvertChange from "../../components/molecules/ConvertChange";
import ChampionChangeDev from "../../components/molecules/ChampionChange/ChampionChangeDev";

import { arrayMove } from "../../core/helpers/move-array";
import AuthContext from "../../core/contexts/AuthContext";

import json from "./mock.json";
import { defaultAbilityChange } from "./helpers";

import styles from "./styles.module.scss";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [championInfo, setChampionInfo] = useState<any>({
    name: json.sections[0].champions[0].name,
    goal: json.sections[0].champions[0].goal,
    resume: json.sections[0].champions[0].resume,
    context: json.sections[0].champions[0].context,
  });

  const [changes, setChanges] = useState<ChampionChange["changes"]>(
    // @ts-ignore
    json.sections[0].champions[0].changes
  );

  function handleChampion(value: any) {
    setChampionInfo(value);
  }

  function handleChange() {
    const newChanges = [...changes];
    setChanges(newChanges);
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

    setChanges(newArray);
  }

  function handleAdd(index: number) {
    const newArray = [...changes];
    newArray.splice(index + 1, 0, defaultAbilityChange as any);

    setChanges(newArray);
  }

  function handleDelete(index: number) {
    const newArray = [...changes];
    newArray.splice(index, 1);

    setChanges(newArray);
  }

  if (user?.isAdmin)
    return (
      <div className={styles["admin-page"]}>
        {/* <ConvertChange /> */}
        <div className={styles["admin-page__test"]}>
          <ChampionChangeDev
            championInfo={championInfo}
            change={{ ...championInfo, changes }}
          />
          <div className={styles["admin-page__test__jsons"]}>
            <JSONEditor
              key={`jsonchange-info`}
              json={championInfo}
              setJson={(value: any) => handleChampion(value)}
            />
            {changes.map((change, i) => (
              <>
                <div
                  key={`jsonchange-${i}`}
                  className={styles["admin-page__change"]}
                >
                  <div className={styles["admin-page__change__move"]}>
                    {i !== 0 && (
                      <ImMoveUp onClick={() => handleMove(i, "up")} />
                    )}
                    {i !== changes.length - 1 && (
                      <ImMoveDown onClick={() => handleMove(i, "down")} />
                    )}
                    <MdDeleteForever
                      className={styles["admin-page__change__delete"]}
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
                  className={styles["admin-page__add-change"]}
                  onClick={() => handleAdd(i)}
                >
                  <MdLibraryAdd />
                </button>
              </>
            ))}
          </div>
        </div>
      </div>
    );

  return <BateuNaPortaDaPortaErrada />;
};

export default AdminPanel;
