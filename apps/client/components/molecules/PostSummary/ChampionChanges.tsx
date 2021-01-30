import ChampionIcon from "../../atoms/ChampionIcon";
import ChangeIcon from "../../atoms/Icons/ChangeIcon";
import Typography from "../../atoms/Typography";

import { ChampionChangesProps } from "./interfaces";

import styles from "./styles.module.scss";

const ChampionsChanges = (props: ChampionChangesProps) => {
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

export default ChampionsChanges;
