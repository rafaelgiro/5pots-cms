import { useEffect, useContext, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import UIContext from "../../../core/contexts/UIContext";
import Typography from "../../atoms/Typography";
import MenuButton from "../Header/MenuButton";

import map from "../../../core/assets/images/map_01.svg";

import styles from "./styles.module.scss";

const FullScreenMenu = (props) => {
  const { className } = props;
  const { state } = useContext(UIContext);
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

FullScreenMenu.propTypes = {
  className: PropTypes.string,
};

FullScreenMenu.defaultProps = {
  className: "",
};

export default FullScreenMenu;
