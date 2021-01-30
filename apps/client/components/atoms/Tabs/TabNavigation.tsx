import { useContext } from "react";
import clsx from "clsx";

import { TabsContext } from "./Tabs";
import Typography from "../Typography";
import SectionIcon from "../Icons/SectionIcon";

import { TabNavigationProps } from "./interfaces";
import { SectionIconsType } from "../Icons/interfaces";
import styles from "./styles.module.scss";

const TabNavigation = (props: TabNavigationProps) => {
  const { options, onClick } = props;
  const { current, setCurrent } = useContext(TabsContext);

  const containerClassName = clsx(styles["tab-navigation"]);

  function handleClick(i: number) {
    if (onClick) onClick();

    return setCurrent(i);
  }

  function renderOptions() {
    const links = options.map(
      (
        { title, icon }: { title: string; icon: SectionIconsType },
        i: number
      ) => {
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
      }
    );
    return links;
  }

  return <div className={containerClassName}>{renderOptions()}</div>;
};

export default TabNavigation;
