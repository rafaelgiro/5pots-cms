import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  IoMdCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";

import UIContext from "../../../contexts/UIContext";
import Typography from "../Typography";

const Snackbar = (props) => {
  const { className } = props;
  const { state, dispatch } = useContext(UIContext);

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
    <div
      className={`snackbar snackbar--${state.snackbar.variant} ${
        state.snackbar.visible && "snackbar--visible"
      } ${className}`}
    >
      <Typography component="p" variant="p">
        {state.snackbar.msg}
      </Typography>
      <Icon className="snackbar__icon" />
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
