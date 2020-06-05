/* eslint-disable react/jsx-props-no-spreading */
// regras do Airbnb pede pro label encobrir o input além do id, mas vai zoar demais o css
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import PropTypes from "prop-types";
import * as MaterialIcons from "react-icons/md";

const TextField = React.forwardRef((props, ref) => {
  const {
    className,
    type,
    placeholder,
    label,
    required,
    icon,
    name,
    id,
    ...rest
  } = props;
  const Icon = icon ? MaterialIcons[icon] : undefined;

  return (
    <div className={`text-field ${className}`}>
      {icon ? <Icon className="text-field__icon" /> : <></>}
      <input
        type={type}
        className="text-field__input"
        placeholder={placeholder}
        required={required}
        ref={ref}
        name={name}
        {...rest}
      />
      <label className="text-field__label" htmlFor={name || id}>
        {label}
      </label>
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
  icon: PropTypes.string,
  // Classes extras
  className: PropTypes.string,
  // ID do textField
  id: PropTypes.string,
  // Name do textfield, mande ele ou o id
  name: PropTypes.string,
};

TextField.defaultProps = {
  placeholder: "",
  required: false,
  icon: "",
  className: "",
  id: "",
  name: "",
};

export default TextField;
