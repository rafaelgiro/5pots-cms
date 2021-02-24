/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext, useState } from "react";

import BateuNaPortaDaPortaErrada from "../404";
import JSONEditor from "../../components/atoms/JSONEditor";

import ChampionChange from "../../components/molecules/ChampionChange";
import AuthContext from "../../core/contexts/AuthContext";
import json from "./mock.json";
import champion from "./ahrimock.json";

import styles from "./styles.module.scss";
import ConvertChange from "../../components/molecules/ConvertChange";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [championInfo, setChampionInfo] = useState({
    name: json.sections[0].champions[0].name,
    goal: json.sections[0].champions[0].goal,
    resume: json.sections[0].champions[0].resume,
    context: json.sections[0].champions[0].context,
  });
  const [changes, setChanges] = useState(json.sections[0].champions[0].changes);

  function handleChampion(value: any) {
    setChampionInfo(value);
  }

  function handleChange(index: number, value: any) {
    const newChanges = [...changes];
    newChanges[index] = value;
    setChanges(newChanges);
  }

  if (user?.isAdmin)
    return (
      <div className={styles["admin-page"]}>
        <ConvertChange />
        <div className={styles["admin-page__test"]}>
          <ChampionChange
            champion={champion}
            change={{ ...championInfo, changes }}
          />
          <div className={styles["admin-page__test__jsons"]}>
            <JSONEditor
              key={`jsonchange-info`}
              json={championInfo}
              setJson={(value: any) => handleChampion(value)}
            />
            {/* @ts-ignore */}
            {changes.map((change, i) => (
              <JSONEditor
                key={`jsonchange-${i}`}
                json={change}
                setJson={(value: any) => handleChange(i, value)}
              />
            ))}
          </div>
        </div>
      </div>
    );

  return <BateuNaPortaDaPortaErrada />;
};

export default AdminPanel;
