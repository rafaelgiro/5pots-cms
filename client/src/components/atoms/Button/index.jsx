import React from "react";
import PropTypes from "prop-types";

const Button = props => {
  const { className, children, variant, type, color } = props;
  /* eslint-disable react/button-has-type */
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${variant}--${color} ${className} `}
    >
      {children}
    </button>
  );
  /* eslint-enable react/button-has-type */
};

Button.propTypes = {
  // Texto do botão
  children: PropTypes.node.isRequired,
  // Estilo do botão
  variant: PropTypes.oneOf(["normal", "outline", "invisible"]),
  // Tipo do botão
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  // Cor do botão
  color: PropTypes.string,
  // Classes extras para o component
  className: PropTypes.string
};

Button.defaultProps = {
  className: "",
  type: "button",
  // Por default o botão é cinza
  color: "default",
  // e cheio
  variant: "normal"
};

export default Button;
