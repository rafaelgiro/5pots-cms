/* eslint-disable react/jsx-one-expression-per-line */
import { array, oneOf } from "prop-types";
import ChampionIcon from "../../atoms/ChampionIcon";
import ChangeIcon from "../../atoms/Icons/ChangeIcon";
import Typography from "../../atoms/Typography";

import styles from "./styles.module.scss";

const ChampionsChanges = (props) => {
  const { changes, type } = props;

  const champions = changes?.filter((champ) => champ.goal === type);

  if (champions?.length > 0)
    return (
      <div className={styles["champion-changes"]}>
        <div className={styles["champion-changes__title"]}>
          <ChangeIcon type={type} />
          <Typography variant="h4" component="h4">
            {type === "adjust" ? "ajuste" : type}s
          </Typography>
        </div>
        <div className={styles["champion-changes__champions"]}>
          {champions?.map((champ) => (
            <a key={`champ-title-${champ.name}`} href={`#${champ.name}`}>
              <ChampionIcon name={champ.name} showName />
            </a>
          ))}
        </div>
      </div>
    );

  return <></>;
};

ChampionsChanges.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  changes: array.isRequired,
  type: oneOf(["buff", "adjust", "nerf", "rework"]).isRequired,
};

export default ChampionsChanges;
