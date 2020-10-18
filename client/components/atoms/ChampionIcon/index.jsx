import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const ChampionIcon = (props) => {
  const { name } = props;
  return (
    <div
      style={{
        backgroundImage: `url(
          http://ddragon.leagueoflegends.com/cdn/10.2.1/img/champion/${name}.png
        )`,
      }}
      className={styles["champion-icon"]}
    />
  );
};

ChampionIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ChampionIcon;
