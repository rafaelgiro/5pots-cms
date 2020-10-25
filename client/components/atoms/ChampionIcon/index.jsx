import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const ChampionIcon = (props) => {
  const { name } = props;
  return (
    <div
      style={{
        backgroundImage: `url(
          https://f002.backblazeb2.com/file/cincopots/champions/${name}.png
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
