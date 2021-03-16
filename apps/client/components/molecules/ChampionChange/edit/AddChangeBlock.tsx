import clsx from "clsx";
import Typography from "../../../atoms/Typography";

import { AddChangeBlockProps } from "../interfaces";

import viewStyles from "../styles.module.scss";
import styles from "./styles.module.scss";

const AddChangeBlock = (props: AddChangeBlockProps) => {
  const { addChangeBlock, changeIndex } = props;
  return (
    <button onClick={() => addChangeBlock(changeIndex)}>
      <Typography
        component="p"
        variant="p"
        className={clsx(viewStyles["single-change"], styles.add)}
      >
        <span
          className={clsx(
            viewStyles["champion-change--type"],
            viewStyles[`champion-change--type-change`]
          )}
        >
          MUDANÇA
        </span>
        <span className={viewStyles["champion-change--attribute"]}>
          atributo
        </span>
        :{" "}
        <span className={viewStyles["champion-change--before"]}>
          10/20/30/40/50
        </span>{" "}
        -&gt;{" "}
        <span className={viewStyles["champion-change--after"]}>
          20/30/40/50/60
        </span>
      </Typography>
    </button>
  );
};

export default AddChangeBlock;
