import { useContext } from "react";

import { TabsContext } from "./Tabs";

import { TabContentProps } from "./interfaces";
import styles from "./styles.module.scss";

const TabContent = (props: TabContentProps) => {
  const { content } = props;
  const { current } = useContext(TabsContext);

  // Mostra o content que tem o index igual ao do contexto
  function renderContent() {
    const currentContent = content.map((singleContent, i) => {
      if (i === current)
        return (
          <div key={`tab-${i}`} className={styles["tab-item--visible"]}>
            {singleContent}
          </div>
        );
      return (
        <div key={`tab-${i}`} className={styles["tab-item"]}>
          {singleContent}
        </div>
      );
    });
    return currentContent;
  }

  return <div className={styles.tabs__content}>{renderContent()}</div>;
};
export default TabContent;
