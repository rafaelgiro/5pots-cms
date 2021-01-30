import { useEffect, useState, useReducer } from "react";
import clsx from "clsx";

import Typography from "../../atoms/Typography";
import MenuButton from "../Header/MenuButton";

import map from "../../../core/assets/images/map_01.svg";

import { FullScreenMenuProps } from "./interfaces";
import styles from "./styles.module.scss";
import { initialState, reducer } from "../../../core/contexts/UIContext";

const FullScreenMenu = (props: FullScreenMenuProps) => {
  const { className } = props;
  const [state] = useReducer(reducer, initialState);
  const [zindex, setZIndex] = useState(false);

  const fullClass = clsx(
    styles["full-screen-menu"],
    zindex && styles["full-screen-menu--z-index"],
    className
  );

  const wideClass = clsx(
    styles["full-screen-menu__wide"],
    state.menu && styles["full-screen-menu__wide--open"]
  );

  const localClass = clsx(
    styles["full-screen-menu__local"],
    state.menu && styles["full-screen-menu__local--open"]
  );

  // ZIndex tem que sumir só quando a animação do menu terminar
  useEffect(() => {
    if (!state.menu) {
      setTimeout(() => {
        setZIndex(false);
      }, 700);
    } else {
      setZIndex(true);
    }
  }, [state.menu]);

  return (
    <div className={fullClass}>
      <div className={localClass}>
        <div>
          <Typography variant="h3" component="h4">
            Na página atual
          </Typography>
        </div>
      </div>
      <div className={wideClass} style={{ backgroundImage: `url(${map})` }}>
        <div className={styles["full-screen-menu__close-btn"]}>
          {state.menu && <MenuButton />}
        </div>
        <div>
          <Typography variant="h3" component="h4">
            Navegar pela 5pots
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default FullScreenMenu;
