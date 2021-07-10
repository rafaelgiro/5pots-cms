import MdAssistant from "@meronex/icons/md/MdAssistant";
import MdFormatShapes from "@meronex/icons/md/MdFormatShapes";
import { useContext } from "react";

import SectionIcon from "../../atoms/Icons/SectionIcon";
import EditContext from "./EditContext";
import { defaultSkinChange } from "./helpers";

import styles from "./styles.module.scss";

const AddSection = () => {
  const { setPostState } = useContext(EditContext);

  function addChampion() {
    setPostState((curr) => {
      const newSection = { title: "Campeões", champions: [] };
      curr.sections.push(newSection);
      curr.subTitles.push("Campeões");

      return { ...curr };
    });
  }

  function addSkin() {
    setPostState((curr) => {
      const newSection = { title: "Skins", skins: [defaultSkinChange] };
      curr.sections.push(newSection);
      curr.subTitles.push("Skins");

      return { ...curr };
    });
  }

  function addEditor() {
    setPostState((curr) => {
      const newSection = {
        title: "Nova Seção",
        content: {
          time: 1550476186479,
          blocks: [
            {
              type: "paragraph",
              data: {
                text: "Hey there!",
              },
            },
          ],
          version: "2.22.1",
        },
      };
      curr.sections.push(newSection);
      curr.subTitles.push("Nova Seção");

      return { ...curr };
    });
  }

  return (
    <div className={styles["add-section"]}>
      <MdAssistant />
      <div className={styles["add-section__btns"]}>
        <button onClick={addChampion}>
          <SectionIcon section="champions" />
        </button>
        <button onClick={addSkin}>
          <SectionIcon section="skins" />
        </button>
        <button onClick={addEditor}>
          <MdFormatShapes />
        </button>
      </div>
    </div>
  );
};

export default AddSection;
