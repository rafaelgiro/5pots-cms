import React, { useState, useEffect } from "react";
import clsx from "clsx";

import { CollapseProps } from "./interfaces";
import styles from "./styles.module.scss";

const Collapse = (props: CollapseProps) => {
  const { children, isOpen, className, ...rest } = props;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(isOpen);
  }, [isOpen]);

  const handleActive = clsx(
    styles.collapse,
    isActive && styles["collapse--active"],
    className
  );

  return (
    <div className={handleActive} {...rest}>
      {children}
    </div>
  );
};

export default Collapse;
