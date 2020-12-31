/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-cycle */
import { useContext } from "react";
import { array, func } from "prop-types";
import clsx from "clsx";

import { TabsContext } from "./Tabs";
import SectionIcon from "../Icons/SectionIcon";

import Typography from "../Typography";

import styles from "./styles.module.scss";

const TabNavigation = (props) => {
  const { options, onClick } = props;
  const { current, setCurrent } = useContext(TabsContext);

  const containerClassName = clsx(styles["tab-navigation"]);

  function handleClick(i) {
    if (onClick) onClick();

    return setCurrent(i);
  }

  function renderOptions() {
    const links = options.map(({ title, icon }, i) => {
      const className = clsx(
        current !== i && styles["tab-navigation--not-active"]
      );

      return (
        <a
          key={`tab-${title}`}
          tabIndex={0}
          role="button"
          onKeyPress={() => current !== i && handleClick(i)}
          onClick={() => current !== i && handleClick(i)}
          className={className}
        >
          <SectionIcon section={icon} />
          <Typography variant="h4" component="p" key={title}>
            {title}
          </Typography>
        </a>
      );
    });
    return links;
  }

  return <div className={containerClassName}>{renderOptions()}</div>;
};

TabNavigation.propTypes = {
  options: array.isRequired,
  onClick: func,
};

TabNavigation.defaultProps = {
  onClick: () => {},
};

export default TabNavigation;
