import clsx from "clsx";
import { useContext } from "react";
import ContentEditable from "react-contenteditable";
import EditContext from "../../../templates/PostEdit/EditContext";
import { SectionTitleDevProps } from "../interfaces";

import styles from "../styles.module.scss";

const SectionTitleEdit = (props: SectionTitleDevProps) => {
  const { children, title, sectionIndex } = props;
  const { postState, setPostState } = useContext(EditContext);

  function handleTitleChange(newTitle: string) {
    if (postState) {
      const newState = { ...postState };
      postState.sections[sectionIndex].title = newTitle;
      setPostState(newState);
    }
  }

  return (
    <div
      className={clsx(
        styles["section-title"],
        styles["section-title--dev"],
        title === "skins" && styles["section-title--skins"]
      )}
    >
      {children}
      <ContentEditable
        tagName="h2"
        html={title}
        onChange={(e) => handleTitleChange(e.target.value)}
      />
    </div>
  );
};

export default SectionTitleEdit;
