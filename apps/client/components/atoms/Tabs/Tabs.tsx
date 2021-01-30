import React, {
  useState,
  useEffect,
  createContext,
  Children,
  ReactElement,
} from "react";
import clsx from "clsx";

import TabNavigation from "./TabNavigation";
import TabContent from "./TabContent";

import { OptionsI, TabContextProps, TabsProps } from "./interfaces";
import styles from "./styles.module.scss";

export const TabsContext = createContext<TabContextProps>({
  current: 0,
  setCurrent: (active: number) => active,
});

const Tabs = (props: TabsProps) => {
  const { children, onClick, className, ...rest } = props;
  const [options, setOptions] = useState<OptionsI[]>([]);
  const [tabContent, setTabContent] = useState<ReactElement[]>([]);
  const [current, setCurrent] = useState(0);

  const tabsClass = clsx(styles.tabs, className);

  // Separa os títulos dos contents em 2 arrays
  useEffect(() => {
    const optionsArr: OptionsI[] = [];
    const contentArr = Children.map(children, (child: ReactElement) => {
      if (child && child.props)
        optionsArr.push({
          id: child.props.id,
          title: child.props.title,
          icon: child.props.icon,
        });
      return child?.props.children;
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

export default Tabs;
