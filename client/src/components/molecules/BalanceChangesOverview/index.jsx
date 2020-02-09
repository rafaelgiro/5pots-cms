import React, { useState } from "react";

import Typography from "../../atoms/Typography";
import ChampionIcon from "../../atoms/ChampionIcon";

const championsHC = [
  "Sion",
  "Sylas",
  "Ivern",
  "MissFortune",
  "Rumble",
  "Aphelios",
  "Leona",
  "Akali",
  "Corki"
];

const BCOverview = () => {
  // eslint-disable-next-line no-unused-vars
  const [champions, setChampions] = useState(championsHC);
  const renderIcons = () => {
    const icons = champions.map(champion => {
      return <ChampionIcon name={champion} />;
    });

    return icons;
  };

  if (window.innerWidth < 900) {
    return <div />;
  } else {
    return (
      <div className="bc-overview">
        <Typography className="sidebar__title" component="h4" variant="h4">
          Tentativas de Balanceamento
        </Typography>
        {renderIcons()}
      </div>
    );
  }
};

export default BCOverview;
