import React from "react";
import PropTypes from "prop-types";

const ChampionIcon = props => {
  const { name } = props;
  return (
    <img
      src={`https://am-a.akamaihd.net/image?f=http://ddragon.leagueoflegends.com/cdn/10.2.1/img/champion/${name}.png`}
      alt={`${name}`}
      className="champion-icon"
    />
  );
};

ChampionIcon.propTypes = {
  name: PropTypes.string.isRequired
};

export default ChampionIcon;
