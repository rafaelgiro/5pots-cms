import clsx from "clsx";
import { useContext } from "react";
import UIContext from "../../../core/contexts/UIContext";

import styles from "./styles.module.scss";

const Loadingbar = () => {
  const { uiState } = useContext(UIContext);

  const loadingClass = clsx(
    styles.loading,
    uiState.isLoading && styles["loading--visible"]
  );
  return <div className={loadingClass} />;
};

export default Loadingbar;
