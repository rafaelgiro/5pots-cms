import clsx from "clsx";
import Typography from "../Typography";

import { ChampionIconProps } from "./interfaces";
import styles from "./styles.module.scss";

const ChampionIcon = (props: ChampionIconProps) => {
  const { name, showName, small } = props;
  return (
    <div className={styles["champion-icon__container"]}>
      <img
        alt={`${name} icon`}
        src={`
          https://assets.5pots.com/file/cincopots/champions/${name
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

export default ChampionIcon;
