import React from "react";
import PropTypes from "prop-types";

const Typography = props => {
  const { component, variant, children, className } = props;
  const Text = component;

  return (
    <Text className={`typography typography__${variant} ${className}`}>
      {children}
    </Text>
  );
};

Typography.propTypes = {
  // Componente que vai ser renderizado no DOM ("p", "h1", "h2"...)
  component: PropTypes.string.isRequired,
  // Visual do componente
  variant: PropTypes.string.isRequired,
  // Texto a ser renderizado
  children: PropTypes.node.isRequired,
  // Classes extras para o component
  className: PropTypes.string
};

Typography.defaultProps = {
  className: ""
};

export default Typography;
