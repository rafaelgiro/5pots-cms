import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  IoMdCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";

import Typography from "../Typography";

const Snackbar = (props) => {
  const { info, className, variant, visible, setVisible } = props;

  let Icon;
  switch (variant) {
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
    console.log("mostra aí chefe");

    if (visible) {
      setTimeout(() => {
        console.log("esconde ai chefe");
        setVisible(false);
      }, 4000);
    }
  }, [visible, setVisible]);

  return (
    <div
      className={`snackbar snackbar--${variant} ${
        visible && "snackbar--visible"
      } ${className}`}
    >
      <Typography component="p" variant="p">
        {info}
      </Typography>
      <Icon className="snackbar__icon" />
    </div>
  );
};

Snackbar.propTypes = {
  className: PropTypes.string,
  info: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["success", "default", "error"]),
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

Snackbar.defaultProps = {
  className: "",
  variant: "default",
};

export default Snackbar;
