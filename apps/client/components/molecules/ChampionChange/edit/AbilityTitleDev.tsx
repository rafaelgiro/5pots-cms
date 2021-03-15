import SimpleSelect from "../../../atoms/SimpleSelect";
import Typography from "../../../atoms/Typography";

import { AbilityTitleDevProps } from "../interfaces";
import styles from "./styles.module.scss";

const AbilityTitle = (props: AbilityTitleDevProps) => {
  const {
    isBase,
    abilityKey,
    abilityName,
    unsanitazedChampion,
    handleAbilityKey,
    changeIndex,
  } = props;

  const blockName = isBase ? "Atributos Base" : abilityName;

  return (
    <div className={styles["ability-title-dev"]}>
      <SimpleSelect
        options={[
          { value: "base", label: "BASE" },
          { value: "p", label: "P" },
          { value: "q", label: "Q" },
          { value: "w", label: "W" },
          { value: "e", label: "E" },
          { value: "r", label: "R" },
        ]}
        handleChange={(val) =>
          handleAbilityKey(unsanitazedChampion, changeIndex, val as AbilityKey)
        }
        defaultValue={abilityKey}
        className={styles["ability-title-dev__select"]}
      />
      <Typography variant="h4" component="h5">
        - {blockName}
      </Typography>
    </div>
  );
};

export default AbilityTitle;
