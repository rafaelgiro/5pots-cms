/* eslint-disable react/jsx-one-expression-per-line */
import { useState } from "react";
import clsx from "clsx";
import { bool, string } from "prop-types";
import Typography from "../../atoms/Typography";

import api from "../../../core/services/api";

import styles from "./styles.module.scss";

const AbilityTitle = (props) => {
  const { isBase, abilityKey, abilityName, championName } = props;
  const [tooltip, setTooltip] = useState(false);
  const [ability, setAbility] = useState();

  const tooltipClass = clsx(styles.tooltip, tooltip && styles["tooltip--open"]);

  async function handleClick() {
    setTooltip(!tooltip);

    const res = await api.get(
      `/tooltip?championName=${championName}&abilityKey=${abilityKey.toUpperCase()}`
    );
    const { data } = res;

    setAbility(data);
  }

  if (isBase) {
    return (
      <Typography className={styles.base} variant="h4" component="h5">
        Atributos Base
      </Typography>
    );
  }

  return (
    <button
      className={styles.tooltip__container}
      type="button"
      onClick={() => handleClick(!tooltip)}
    >
      <div className={tooltipClass}>
        <Typography
          className={styles.tooltip__title}
          component="span"
          variant="p"
        >
          [{abilityKey}] {abilityName}
        </Typography>
        {ability ? (
          <Typography
            className={styles.tooltip__desc}
            variant="p"
            component="p"
          >
            <span
              dangerouslySetInnerHTML={{
                __html: ability ? ability.description : "",
              }}
            />
          </Typography>
        ) : (
          <>
            <span className={styles["tooltip__skeleton-1"]} />
            <span className={styles["tooltip__skeleton-2"]} />
          </>
        )}
      </div>
      <Typography variant="h4" component="h5">
        {abilityKey} - {abilityName}
      </Typography>
    </button>
  );
};

AbilityTitle.propTypes = {
  isBase: bool.isRequired,
  abilityKey: string.isRequired,
  abilityName: string,
  championName: string.isRequired,
};

AbilityTitle.defaultProps = {
  abilityName: "",
};

export default AbilityTitle;
