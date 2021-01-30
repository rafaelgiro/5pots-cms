import clsx from "clsx";
import Typography from "../../atoms/Typography";

import { ChangeBlockProps } from "./interfaces";
import styles from "./styles.module.scss";

const ChangeBlock = (props: ChangeBlockProps) => {
  const { block } = props;

  const typeMap = {
    removed: "REMOVIDO",
    new: "NOVO",
    updated: "ATUALIZADO",
    reworked: "REFEITO",
  };

  return (
    <Typography component="p" variant="p" className={styles["single-change"]}>
      {block.type !== "change" && (
        <span
          className={clsx(
            styles["champion-change--type"],
            styles[`champion-change--type-${block.type}`]
          )}
        >
          {typeMap[block.type]}
        </span>
      )}
      <span className={styles["champion-change--attribute"]}>
        {block.attribute}
      </span>
      :{" "}
      {block.before && (
        <>
          <span className={styles["champion-change--before"]}>
            {block.before}
          </span>{" "}
          -&gt;{" "}
        </>
      )}
      <span className={styles["champion-change--after"]}>{block.after}</span>
    </Typography>
  );
};

export default ChangeBlock;
