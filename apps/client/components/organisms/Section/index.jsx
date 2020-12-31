import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const Section = (props) => {
  const { children, name, className } = props;
  return (
    <section className={className}>
      <span className={styles["section-id"]}>{name}</span>
      {children}
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
};

Section.defaultProps = {
  name: "",
  className: "",
};

export default Section;
