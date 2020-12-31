import { useState } from "react";

import Typography from "../../atoms/Typography";
import ChampionIcon from "../../atoms/ChampionIcon";

import styles from "./styles.module.scss";

const championsHC = [
  "Sion",
  "Sylas",
  "Ivern",
  "MissFortune",
  "Rumble",
  "Aphelios",
  "Leona",
  "Akali",
  "Corki",
];

const BCOverview = () => {
  // eslint-disable-next-line no-unused-vars
  const [champions, setChampions] = useState(championsHC);
  const renderIcons = () => {
    const icons = champions.map((champion) => {
      return <ChampionIcon key={champion} name={champion} />;
    });

    return icons;
  };

  return (
    <div className={styles["bc-overview"]}>
      <Typography className="sidebar__title" component="h4" variant="h4">
        Tentativas de Balanceamento
      </Typography>
      <div>{renderIcons()}</div>
    </div>
  );
};

export default BCOverview;
