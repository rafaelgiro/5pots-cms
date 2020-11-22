/* eslint-disable import/no-cycle */
import React, { useState, useEffect, createContext, Children } from "react";
import { node, func, string } from "prop-types";
import clsx from "clsx";

import TabNavigation from "./TabNavigation";
import TabContent from "./TabContent";

import styles from "./styles.module.scss";

export const TabsContext = createContext({
  current: 0,
  setCurrent: () => 0,
  isVertical: false,
});

const Tabs = (props) => {
  const { children, onClick, className, ...rest } = props;
  const [options, setOptions] = useState([]);
  const [tabContent, setTabContent] = useState([]);
  const [current, setCurrent] = useState(0);

  const tabsClass = clsx(styles.tabs, className);

  // Separa os títulos dos contents em 2 arrays
  useEffect(() => {
    const optionsArr = [];
    const contentArr = Children.map(children, (child) => {
      optionsArr.push({
        id: child.props.id,
        title: child.props.title,
        icon: child.props.icon,
      });
      return child.props.children;
    });
    setOptions(optionsArr);
    setTabContent(contentArr);
  }, [children]);

  return (
    <div className={tabsClass} {...rest}>
      <TabsContext.Provider value={{ current, setCurrent }}>
        <TabNavigation options={options} onClick={onClick} />
        <TabContent content={tabContent} />
      </TabsContext.Provider>
    </div>
  );
};

Tabs.propTypes = {
  children: node.isRequired,
  onClick: func,
  className: string,
};

Tabs.defaultProps = {
  onClick: () => {},
  className: "",
};

export default Tabs;
