import clsx from "clsx";
import PropTypes from "prop-types";
import Typography from "../Typography";
import styles from "./styles.module.scss";

const ChampionIcon = (props) => {
  const { name, showName, small } = props;
  return (
    <div className={styles["champion-icon__container"]}>
      <img
        alt={`${name} icon`}
        src={`
          https://f002.backblazeb2.com/file/cincopots/champions/${name
            .replace(" ", "")
            .replace("'", "")}.png
        `}
        className={clsx(
          styles["champion-icon"],
          small && styles["champion-icon--small"]
        )}
      />
      {showName && (
        <Typography variant="p" component="p">
          {name}
        </Typography>
      )}
    </div>
  );
};

ChampionIcon.propTypes = {
  name: PropTypes.string.isRequired,
  showName: PropTypes.bool,
  small: PropTypes.bool,
};

ChampionIcon.defaultProps = {
  showName: false,
  small: false,
};

export default ChampionIcon;
