/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { forwardRef, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import MdVisibilityOff from "@meronex/icons/md/MdVisibilityOff";
import MdVisibility from "@meronex/icons/md/MdVisibility";

import Typography from "../Typography";

import styles from "./styles.module.scss";

const TextField = forwardRef((props, ref) => {
  const {
    className,
    type,
    placeholder,
    label,
    required,
    icon: Icon,
    name,
    id,
    errors,
    ...rest
  } = props;
  const [hideText, setHideText] = useState(type === "password");
  const HideIcon = hideText ? MdVisibilityOff : MdVisibility;

  const containerClass = clsx(
    styles["text-field"],
    errors[name]?.message && styles["text-field--error"]
  );

  const inputClass = clsx(
    styles["text-field__input"],
    errors[name]?.message && styles["text-field__input--error"]
  );

  return (
    <div className={containerClass}>
      {Icon ? <Icon className={styles["text-field__icon"]} /> : <></>}
      <input
        type={hideText ? "password" : "text"}
        className={inputClass}
        placeholder={placeholder}
        required={required}
        ref={ref}
        name={name}
        {...rest}
      />
      <label className={styles["text-field__label"]} htmlFor={name || id}>
        {label}
      </label>
      {type === "password" && (
        <HideIcon
          onClick={() => setHideText(!hideText)}
          className={styles["text-field__view-password"]}
        />
      )}
      <Typography
        component="span"
        variant="p"
        className={styles["text-field__error"]}
      >
        {errors[name]?.message}
      </Typography>
    </div>
  );
});

TextField.propTypes = {
  // Label do input
  label: PropTypes.string.isRequired,
  // Se vai ver as letrinha, e se vai validar email
  type: PropTypes.oneOf(["text", "password", "email"]).isRequired,
  // Placeholder com texto exemplo
  placeholder: PropTypes.string,
  // Boolean se o campo é obrigatório ou não
  required: PropTypes.bool,
  // ícone do input (apenas do Material)
  icon: PropTypes.node,
  // Classes extras
  className: PropTypes.string,
  // ID do textField
  id: PropTypes.string,
  // Name do textfield, mande ele ou o id
  name: PropTypes.string,
  // errors do react hook form
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.any,
};

TextField.defaultProps = {
  placeholder: "",
  required: false,
  icon: "",
  className: "",
  id: "",
  name: "",
  errors: {},
};

export default TextField;
