/* eslint-disable import/no-cycle */
/* eslint-disable react/forbid-prop-types */
import { array } from "prop-types";
import { useContext } from "react";

import { TabsContext } from "./Tabs";

import styles from "./styles.module.scss";

const TabContent = (props) => {
  const { content } = props;
  const { current } = useContext(TabsContext);

  // Mostra o content que tem o index igual ao do contexto
  function renderContent() {
    const currentContent = content.map((singleContent, i) => {
      if (i === current)
        return (
          <div className={styles["tab-item--visible"]}>{singleContent}</div>
        );
      return <div className={styles["tab-item"]}>{singleContent}</div>;
    });
    return currentContent;
  }

  return <div className={styles.tabs__content}>{renderContent()}</div>;
};

TabContent.propTypes = {
  content: array.isRequired,
};

export default TabContent;
