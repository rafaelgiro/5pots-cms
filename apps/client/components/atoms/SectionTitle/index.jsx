import PropTypes from "prop-types";

import styles from "./styles.module.scss";

const SectionTitle = (props) => {
  const { children, title } = props;
  return (
    <h2 className={styles["section-title"]}>
      {children}
      {title}
    </h2>
  );
};

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default SectionTitle;
