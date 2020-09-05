import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Typography from "../../atoms/Typography";
import UIContext from "../../../contexts/UIContext";

const MenuButton = (props) => {
  const { onTop, dark } = props;
  const { state, dispatch } = useContext(UIContext);

  const className = clsx(
    "header__menu-btn",
    onTop && "header__menu-btn--hidden",
    state.menu && "header__menu-btn--close",
    dark && "header__menu-btn--dark"
  );

  const handleClick = () => {
    if (state.menu) {
      return dispatch({ type: "CLOSE_MENU" });
    }
    return dispatch({ type: "OPEN_MENU" });
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      <div className="header__menu-btn__burguer">
        <span className="header__menu-btn__burguer-1" />
        <span className="header__menu-btn__burguer-2" />
        <span className="header__menu-btn__burguer-3" />
      </div>
      <Typography component="span" variant="p">
        {state.menu ? "fechar" : "menu"}
      </Typography>
    </button>
  );
};

MenuButton.propTypes = {
  onTop: PropTypes.bool.isRequired,
  dark: PropTypes.bool,
};

MenuButton.defaultProps = {
  dark: false,
};

export default MenuButton;
