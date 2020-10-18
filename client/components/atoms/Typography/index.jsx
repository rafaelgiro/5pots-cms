import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./styles.module.scss";

const Typography = (props) => {
  const { component: Text, variant, children, className, style } = props;

  return (
    <Text
      style={style}
      className={clsx(
        styles.typography,
        styles[`typography--${variant}`],
        className
      )}
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
