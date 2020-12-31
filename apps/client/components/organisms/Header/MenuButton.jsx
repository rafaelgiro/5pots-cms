import { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Typography from "../../atoms/Typography";
import UIContext from "../../../core/contexts/UIContext";

import styles from "./menu-btn.styles.module.scss";

const MenuButton = (props) => {
  const { onTop, dark } = props;
  const { state, dispatch } = useContext(UIContext);

  const className = clsx(
    styles["menu-btn"],
    onTop && styles["menu-btn--hidden"],
    state.menu && styles["menu-btn--close"],
    dark && styles["menu-btn--dark"]
  );

  const handleClick = () => {
    if (state.menu) {
      return dispatch({ type: "CLOSE_MENU" });
    }
    return dispatch({ type: "OPEN_MENU" });
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      <div className={styles["menu-btn__burguer"]}>
        <span className={styles["menu-btn__burguer-1"]} />
        <span className={styles["menu-btn__burguer-2"]} />
        <span className={styles["menu-btn__burguer-3"]} />
      </div>
      <Typography
        component="span"
        variant="p"
        className={styles["menu-btn__text"]}
      >
        {state.menu ? "fechar" : "menu"}
      </Typography>
    </button>
  );
};

MenuButton.propTypes = {
  onTop: PropTypes.bool,
  dark: PropTypes.bool,
};

MenuButton.defaultProps = {
  dark: false,
  onTop: false,
};

export default MenuButton;
