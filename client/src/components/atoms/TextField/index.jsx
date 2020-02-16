// regras do Airbnb pede pro label encobrir o input além do id, mas vai zoar demais o css
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import PropTypes from "prop-types";
import * as MaterialIcons from "react-icons/md";

const TextField = props => {
  const {
    className,
    id,
    type,
    placeholder,
    label,
    initialValue,
    onChange,
    required,
    icon
  } = props;
  const [value, setValue] = useState(initialValue);
  const Icon = icon ? MaterialIcons[icon] : undefined;

  const handleClick = e => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={`text-field ${className}`}>
      {icon ? <Icon className="text-field__icon" /> : <></>}
      <input
        type={type}
        className="text-field__input"
        id={id}
        value={value}
        onChange={handleClick}
        placeholder={placeholder}
        required={required}
      />
      <label className="text-field__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

TextField.propTypes = {
  // ID para associar o input com a label
  id: PropTypes.string.isRequired,
  // Label do input
  label: PropTypes.string.isRequired,
  // Função pra retornar o estado do input
  onChange: PropTypes.func.isRequired,
  // Se vai ver as letrinha, e se vai validar email
  type: PropTypes.oneOf(["text", "password", "email"]).isRequired,
  // Placeholder com texto exemplo
  placeholder: PropTypes.string,
  // Valor inicial já escrito
  initialValue: PropTypes.string,
  // Boolean se o campo é obrigatório ou não
  required: PropTypes.bool,
  // ícone do input (apenas do Material)
  icon: PropTypes.string,
  // Classes extras
  className: PropTypes.string
};

TextField.defaultProps = {
  placeholder: "",
  initialValue: "",
  required: false,
  icon: "",
  className: ""
};

export default TextField;
