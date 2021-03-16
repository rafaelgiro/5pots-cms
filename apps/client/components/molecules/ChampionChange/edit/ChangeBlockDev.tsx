import clsx from "clsx";
import MdDeleteSweep from "@meronex/icons/md/MdDeleteSweep";
import SimpleSelect from "../../../atoms/SimpleSelect";
import Typography from "../../../atoms/Typography";

import { ChangeBlockDevProps } from "../interfaces";

import styles from "./styles.module.scss";
import blockStyles from "../styles.module.scss";
import ContentEditable from "react-contenteditable";

const ChangeBlockDev = (props: ChangeBlockDevProps) => {
  const {
    block,
    handleBlockType,
    changeIndex,
    blockIndex,
    handleBlockChange,
    handleBlockChangeDelete,
  } = props;

  const typeOptions = [
    { value: "change", label: "MUDANÇA" },
    { value: "removed", label: "REMOVIDO" },
    { value: "new", label: "NOVO" },
    { value: "updated", label: "ATUALIZADO" },
  ];

  return (
    <div className={styles["block-dev"]}>
      <button
        onClick={() => handleBlockChangeDelete(changeIndex, blockIndex)}
        className={styles["block-dev__delete"]}
      >
        <MdDeleteSweep />
      </button>
      <SimpleSelect
        className={clsx(
          styles["block-dev__select"],
          styles[`block-dev__select--${block.type}`]
        )}
        options={typeOptions}
        handleChange={(val) =>
          handleBlockType(
            changeIndex,
            blockIndex,
            val as "removed" | "new" | "updated" | "reworked" | "change"
          )
        }
        defaultValue={block.type}
      />
      <Typography
        component="p"
        variant="p"
        className={blockStyles["single-change"]}
      >
        <ContentEditable
          tagName="span"
          html={block.attribute}
          onChange={(e) =>
            handleBlockChange(
              changeIndex,
              blockIndex,
              e.target.value,
              "attribute"
            )
          }
          className={clsx(
            blockStyles["champion-change--attribute"],
            blockStyles.editable
          )}
        />
        :{" "}
        <ContentEditable
          tagName="span"
          html={block.before}
          onChange={(e) =>
            handleBlockChange(changeIndex, blockIndex, e.target.value, "before")
          }
          className={clsx(
            blockStyles["champion-change--before"],
            blockStyles.editable
          )}
        />{" "}
        -&gt;{" "}
        <ContentEditable
          tagName="span"
          html={block.after}
          onChange={(e) =>
            handleBlockChange(changeIndex, blockIndex, e.target.value, "after")
          }
          className={clsx(
            blockStyles["champion-change--after"],
            blockStyles.editable
          )}
        />
      </Typography>
    </div>
  );
};

export default ChangeBlockDev;
