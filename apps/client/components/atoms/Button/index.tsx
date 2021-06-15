import clsx from "clsx";

import { ButtonProps } from "./interfaces";

import styles from "./styles.module.scss";

const Button = (props: ButtonProps) => {
  const {
    className,
    children,
    variant = "normal",
    type = "button",
    color = "default",
    ...rest
  } = props;

  const btnClass = clsx(
    styles.btn,
    styles[`btn--${variant}--${color}`],
    className
  );

  return (
    <button type={type} className={btnClass} {...rest}>
      {children}
    </button>
  );
};

export default Button;
