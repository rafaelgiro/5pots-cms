import React from "react";
import PropTypes from "prop-types";

const Typography = (props) => {
  const { component, variant, children, className, link, style } = props;

  if (link) {
    const Link = component;

    return (
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={link}
        className={`typography typography__${variant} ${className}`}
      >
        {children}
      </Link>
    );
  }

  const Text = component;

  return (
    <Text
      style={style}
      className={`typography typography__${variant} ${className}`}
    >
      {children}
    </Text>
  );
};

Typography.propTypes = {
  // Componente que vai ser renderizado no DOM ("p", "h1", "h2"...)
  component: PropTypes.string.isRequired,
  // Visual do componente
  variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "p", "sub"]).isRequired,
  // Texto a ser renderizado
  children: PropTypes.node,
  // Classes extras para o component
  className: PropTypes.string,
  // Estilos inline
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
};

Typography.defaultProps = {
  className: "",
  children: "",
  style: {},
};

export default Typography;
