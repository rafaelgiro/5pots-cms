import clsx from "clsx";
import Typography from "../../../atoms/Typography";

import { AddAbilityProps } from "../interfaces";

import viewStyles from "../styles.module.scss";
import styles from "./styles.module.scss";

const AddAbility = (props: AddAbilityProps) => {
  const { addAbility, currentAbilities } = props;

  const abilitiesMap: AbilityKey[] = ["p", "q", "w", "e", "r", "base"];
  const availableAbilities = abilitiesMap.filter(
    (ab) => !currentAbilities.includes(ab)
  );

  return (
    <button
      onClick={() => addAbility(availableAbilities[0])}
      className={styles["add-ability"]}
    >
      <div className={clsx(viewStyles["champion-change__change"], styles.add)}>
        <div className={viewStyles["champion-change__change__name"]}>
          <img
            src="https://assets.5pots.com/file/cincopots/abilities/SionP.png"
            alt="imagem da habilidade"
          />
          {/* Nome da habilidade */}
          <Typography variant="h4" component="h5">
            P - IN GLORIA MORI
          </Typography>
        </div>
        {/* Bloco de mudança */}
        <div className={viewStyles["champion-change__change__block"]}>
          <Typography
            component="p"
            variant="p"
            className={viewStyles["single-change"]}
          >
            <span
              className={clsx(
                viewStyles["champion-change--type"],
                viewStyles[`champion-change--type-change`]
              )}
            >
              ADICIONAR
            </span>
            <span className={viewStyles["champion-change--attribute"]}>
              atributo
            </span>
            :{" "}
            <span className={viewStyles["champion-change--before"]}>
              10/20/30/40/50
            </span>{" "}
            -&gt;{" "}
            <span className={viewStyles["champion-change--after"]}>
              20/30/40/50/60
            </span>
          </Typography>
        </div>
      </div>
    </button>
  );
};

export default AddAbility;
