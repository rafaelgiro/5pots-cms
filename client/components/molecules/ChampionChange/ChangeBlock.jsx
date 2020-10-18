/* eslint-disable react/jsx-one-expression-per-line */

import clsx from "clsx";
import PropTypes, { string } from "prop-types";
import Typography from "../../atoms/Typography";

import styles from "./styles.module.scss";

const ChangeBlock = (props) => {
  const { block } = props;

  const typeMap = {
    removed: "REMOVIDO",
    new: "NOVO",
    updated: "ATUALIZADO",
    reworked: "REFEITO",
  };

  return (
    <Typography component="p" variant="p">
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

ChangeBlock.propTypes = {
  block: PropTypes.shape({
    type: string,
    attribute: string,
    before: string,
    after: string,
  }).isRequired,
};

export default ChangeBlock;
