import { useEffect, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  IoMdCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";

import UIContext from "../../../core/contexts/UIContext";
import Typography from "../Typography";

import styles from "./styles.module.scss";

const Snackbar = (props) => {
  const { className } = props;
  const { state, dispatch } = useContext(UIContext);

  const snaccClass = clsx(
    styles.snackbar,
    styles[`snackbar--${state.snackbar.variant}`],
    state.snackbar.visible && styles["snackbar--visible"],
    className
  );

  let Icon;
  switch (state.snackbar.variant) {
    case "success":
      Icon = IoMdCheckmarkCircleOutline;
      break;
    case "error":
      Icon = IoIosCloseCircleOutline;
      break;
    default:
      Icon = IoMdInformationCircleOutline;
      break;
  }

  useEffect(() => {
    if (state.snackbar.visible) {
      setTimeout(() => {
        dispatch({
          type: "HIDE_SNACKBAR",
        });
      }, state.snackbar.time);
    }
  }, [state.snackbar.visible, state.snackbar.time, dispatch]);

  return (
    <div className={snaccClass}>
      <Typography component="p" variant="p">
        {state.snackbar.msg}
      </Typography>
      <Icon className={styles.snackbar__icon} />
    </div>
  );
};

Snackbar.propTypes = {
  className: PropTypes.string,
};

Snackbar.defaultProps = {
  className: "",
};

export default Snackbar;
