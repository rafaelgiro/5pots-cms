import AiFillFileAdd from "@meronex/icons/ai/AiFillFileAdd";
import { useContext } from "react";

import Typography from "../../atoms/Typography";
import EditContext from "../../templates/PostEdit/EditContext";

import { defaultSkinChange } from "../../templates/PostEdit/helpers";

import styles from "./styles.module.scss";

const AddNewSkin = () => {
  const { setPostState, postState } = useContext(EditContext);

  function addSkin() {
    if (postState) {
      const newState = { ...postState };
      const skinSectionIndex = postState?.sections.findIndex(
        (section) => section.skins
      );
      if (
        newState &&
        newState.sections &&
        (skinSectionIndex || skinSectionIndex === 0)
      ) {
        console.log("caiu aqui");
        newState.sections[skinSectionIndex].skins?.push(defaultSkinChange);

        setPostState(newState);
      }
    }
  }

  return (
    <button className={styles.add} onClick={() => addSkin()}>
      <Typography component="h4" variant="h3">
        Adicionar nova skin
        <AiFillFileAdd />
      </Typography>
    </button>
  );
};

export default AddNewSkin;
