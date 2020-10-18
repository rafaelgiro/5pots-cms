import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const Section = (props) => {
  const { children, name } = props;
  return (
    <section>
      <span className={styles["section-id"]}>{name}</span>
      {children}
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
};

Section.defaultProps = {
  name: "",
};

export default Section;
