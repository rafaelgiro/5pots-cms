import { SectionTitleProps } from "./interfaces";

import styles from "./styles.module.scss";

const SectionTitle = (props: SectionTitleProps) => {
  const { children, title } = props;
  return (
    <h2 className={styles["section-title"]}>
      {children}
      {title}
    </h2>
  );
};

export default SectionTitle;
