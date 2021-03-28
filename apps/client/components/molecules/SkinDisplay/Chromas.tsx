import clsx from "clsx";
import { useState } from "react";
import SwipeHandler from "../../atoms/SwipeHandler";
import { ChromasProps } from "./interfaces";
import styles from "./styles.module.scss";

const Chromas = (props: ChromasProps) => {
  const { chromas, id } = props;
  const [active, setActive] = useState(0);
  return (
    <SwipeHandler
      onLeft={() => setActive((active + 1) % chromas.length)}
      onRight={() => setActive((active + chromas.length - 1) % chromas.length)}
    >
      <div className={styles["chromas-container"]}>
        <div className={styles.chromas}>
          {chromas.map((_, i) => (
            <img
              key={`chroma-img-${id}-${i}`}
              className={clsx(
                styles.chromas__img,
                active === i && styles["chromas__img--active"]
              )}
              src={`https://assets.5pots.com/file/cincopots/pbe/${id}-chroma-${i}.png`}
            />
          ))}
        </div>
        <div className={styles.chromas__controls}>
          {chromas.map((color, i) => (
            <div
              className={clsx(
                styles.chromas__controls__color,
                active === i && styles["chromas__controls__color--active"]
              )}
              key={`${id}-${color}`}
              style={{ backgroundColor: color }}
              onMouseEnter={() => setActive(i)}
            />
          ))}
        </div>

        <svg
          height="auto"
          viewBox="0 0 616 771"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.chromas__frame}
        >
          <path
            d="M283 744L307.5 768.5L332 744H614.5V2H2V744H283Z"
            stroke="#564A33"
            strokeWidth="3"
          />
          <path
            d="M15 744L23 752H302L306.5 756.5L311 752H595L602 745"
            stroke="#564A33"
            strokeWidth="2"
          />
        </svg>
      </div>
    </SwipeHandler>
  );
};

export default Chromas;
