import clsx from "clsx";
import { useContext } from "react";
import MdDeleteForever from "@meronex/icons/md/MdDeleteForever";
import MdFileUpload from "@meronex/icons/md/MdFileUpload";
import MdFileDownload from "@meronex/icons/md/MdFileDownload";

import EditContext from "../../../templates/PostEdit/EditContext";

import { SectionDevProps } from "../interfaces";

import styles from "../styles.module.scss";
import { arrayMove } from "../../../../core/helpers/move-array";

const SectionDev = (props: SectionDevProps) => {
  const { children, name, className, sectionIndex } = props;
  const { postState, setPostState } = useContext(EditContext);

  function handleDelete() {
    if (postState) {
      const newPost = { ...postState };
      postState.sections.splice(sectionIndex, 1);
      setPostState(newPost);
    }
  }

  function sectionUp() {
    if (postState && sectionIndex !== 0) {
      const newPost = { ...postState };
      const newArray = arrayMove(
        postState.sections,
        sectionIndex,
        sectionIndex - 1
      );
      setPostState({ ...newPost, sections: newArray });
    }
  }

  function sectionDown() {
    if (postState && sectionIndex < postState.sections.length) {
      const newPost = { ...postState };
      const newArray = arrayMove(
        postState.sections,
        sectionIndex,
        sectionIndex + 1
      );
      setPostState({ ...newPost, sections: newArray });
    }
  }

  return (
    <section className={clsx(className, styles["section-dev"])}>
      <span className={styles["section-id"]}>{name}</span>
      {children}
      <div className={styles["section-dev__controls"]}>
        <button onClick={handleDelete}>
          <MdDeleteForever />
        </button>
        <button onClick={sectionUp}>
          <MdFileUpload />
        </button>
        <button onClick={sectionDown}>
          <MdFileDownload />
        </button>
      </div>
    </section>
  );
};

export default SectionDev;
