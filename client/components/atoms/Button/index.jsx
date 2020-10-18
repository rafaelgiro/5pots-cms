import clsx from "clsx";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const Button = (props) => {
  const { className, children, variant, type, color } = props;

  const btnClass = clsx(
    styles.btn,
    styles[`btn--${variant}--${color}`],
    className
  );

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={btnClass}>
      {children}
    </button>
  );
};

Button.propTypes = {
  // Texto do botão
  children: PropTypes.node.isRequired,
  // Estilo do botão
  variant: PropTypes.oneOf(["normal", "outline", "invisible", "icon"]),
  // Tipo do botão
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  // Cor do botão
  color: PropTypes.string,
  // Classes extras para o component
  className: PropTypes.string,
};

Button.defaultProps = {
  className: "",
  type: "button",
  // Por default o botão é cinza
  color: "default",
  // e cheio
  variant: "normal",
};

export default Button;
