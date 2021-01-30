import { useReducer } from "react";
import clsx from "clsx";

import Typography from "../../atoms/Typography";
import { initialState, reducer } from "../../../core/contexts/UIContext";

import { MenuButtonProps } from "./interfaces";
import styles from "./menu-btn.styles.module.scss";

const MenuButton = (props: MenuButtonProps) => {
  const { onTop, dark } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

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

export default MenuButton;
