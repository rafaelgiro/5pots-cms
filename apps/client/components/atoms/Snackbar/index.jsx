import { useEffect, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import MdCheckmarkCircleOutline from "@meronex/icons/ios/MdCheckmarkCircleOutline";
import IosCloseCircleOutline from "@meronex/icons/ios/IosCloseCircleOutline";
import MdInformationCircleOutline from "@meronex/icons/ios/MdInformationCircleOutline";

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
      Icon = MdCheckmarkCircleOutline;
      break;
    case "error":
      Icon = IosCloseCircleOutline;
      break;
    default:
      Icon = MdInformationCircleOutline;
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
