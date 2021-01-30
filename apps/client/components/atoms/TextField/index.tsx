import { forwardRef, useState } from "react";
import clsx from "clsx";

import MdVisibilityOff from "@meronex/icons/md/MdVisibilityOff";
import MdVisibility from "@meronex/icons/md/MdVisibility";

import Typography from "../Typography";

import { TextFieldProps } from "./interfaces";
import styles from "./styles.module.scss";

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
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
    className,
    styles["text-field"],
    errors && errors[name]?.message && styles["text-field--error"]
  );

  const inputClass = clsx(
    styles["text-field__input"],
    errors && errors[name]?.message && styles["text-field__input--error"]
  );

  return (
    <div className={containerClass}>
      {Icon && <Icon className={styles["text-field__icon"]} />}
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
        {errors && errors[name]?.message}
      </Typography>
    </div>
  );
});

TextField.displayName = "TextField";

export default TextField;
