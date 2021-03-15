import clsx from "clsx";
import MdSave from "@meronex/icons/md/MdSave";

import { SavePostButtonProps } from "./interfaces";
import styles from "./styles.module.scss";

const SavePostButton = (props: SavePostButtonProps) => {
  const { hasChanged, handleUpdate } = props;

  const buttonClass = clsx(styles.save, hasChanged && styles["save--visible"]);

  return (
    <button className={buttonClass} onClick={handleUpdate}>
      <MdSave />
    </button>
  );
};

export default SavePostButton;
