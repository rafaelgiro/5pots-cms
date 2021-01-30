import clsx from "clsx";

import { TypographyProps } from "./interfaces";

import styles from "./styles.module.scss";

const Typography = (props: TypographyProps) => {
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

export default Typography;
