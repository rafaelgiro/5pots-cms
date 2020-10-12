import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";

import UIContext from "../../../contexts/UIContext";
import Typography from "../../atoms/Typography";
import MenuButton from "../Header/MenuButton";

import map from "../../../assets/images/map_01.svg";

const FullScreenMenu = (props) => {
  const { className } = props;
  const { state } = useContext(UIContext);
  const [zindex, setZIndex] = useState(false);

  const wideClass = state.menu ? "full-screen-menu__wide--open" : "";
  const localClass = state.menu ? "full-screen-menu__local--open" : "";

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
    <div
      className={`full-screen-menu ${
        zindex ? "full-screen-menu--z-index" : ""
      } ${className}`}
    >
      <div className={`full-screen-menu__local ${localClass}`}>
        <div>
          <Typography variant="h3" component="h4">
            Na página atual
          </Typography>
        </div>
      </div>
      <div
        className={`full-screen-menu__wide ${wideClass}`}
        style={{ backgroundImage: `url(${map})` }}
      >
        <div className="full-screen-menu__close-btn">
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
