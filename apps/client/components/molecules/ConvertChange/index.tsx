import clsx from "clsx";
import { fromRiot, fromSurrender } from "./helpers";
import { ConvertChangeProps } from "./interfaces";

import styles from "./styles.module.scss";

const ConvertChange = (props: ConvertChangeProps) => {
  const { handleNewFromPaste } = props;

  function handlePaste(e: ClipboardEvent, riot: boolean) {
    e.preventDefault();
    if (riot) handleNewFromPaste(fromRiot(e));
    else handleNewFromPaste(fromSurrender(e));
  }

  return (
    <div className={styles["convert-change"]}>
      <div
        className={clsx(
          styles["convert-change__text-container"],
          styles["convert-change__text-container--riot"]
        )}
      >
        <textarea
          rows={3}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onPaste={(e) => handlePaste(e, true)}
        />
      </div>
      <div
        className={clsx(
          styles["convert-change__text-container"],
          styles["convert-change__text-container--surrender"]
        )}
      >
        <textarea
          rows={3}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onPaste={(e) => handlePaste(e, false)}
        />
      </div>
    </div>
  );
};

export default ConvertChange;
