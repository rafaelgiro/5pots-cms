import { SectionProps } from "./interfaces";
import styles from "./styles.module.scss";

const Section = (props: SectionProps) => {
  const { children, name, className } = props;

  return (
    <section className={className}>
      <span className={styles["section-id"]}>{name}</span>
      {children}
    </section>
  );
};

export default Section;
