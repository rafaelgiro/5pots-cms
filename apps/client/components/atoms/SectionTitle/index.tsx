import clsx from "clsx";
import { SectionTitleProps } from "./interfaces";

import styles from "./styles.module.scss";

const SectionTitle = (props: SectionTitleProps) => {
  const { children, title } = props;
  return (
    <div
      className={clsx(
        styles["section-title"],
        title === "skins" && styles["section-title--skins"]
      )}
    >
      {children}
      <h2>{title}</h2>
    </div>
  );
};

export default SectionTitle;
