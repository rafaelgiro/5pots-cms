/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext } from "react";
import Typography from "../../../atoms/Typography";
import EditContext from "../../../templates/PostEdit/EditContext";
import AddChroma from "./AddChroma";
import EditChroma from "./EditChroma";

import { ManageChromasProps } from "./interfaces";
import styles from "./styles.module.scss";

const ManageChromas = (props: ManageChromasProps) => {
  const { sectionIndex, skinIndex, chromas, id } = props;
  const { postState, setPostState } = useContext(EditContext);

  function setChromaArr(newArr: Skin["chromas"]) {
    if (postState) {
      const newState = { ...postState };
      // @ts-ignore
      newState.sections[sectionIndex].skins[skinIndex].chromas = newArr;
      setPostState(newState);
    }
  }

  function handleColorChange(chromaIndex: number, newColor: string) {
    const newChromaArr = [...chromas];
    newChromaArr[chromaIndex] = newColor;

    setChromaArr(newChromaArr);
  }

  function deleteChroma(chromaIndex: number) {
    const newChromaArr = [...chromas];
    newChromaArr.splice(chromaIndex, 1);

    setChromaArr(newChromaArr);
  }

  return (
    <div className={styles["manage-chromas"]}>
      <Typography component="h6" variant="h4">
        Gerenciar chromas
      </Typography>
      <div>
        {chromas.map((chromaColor, i) => (
          <EditChroma
            id={id}
            chromaColor={chromaColor}
            chromaIndex={i}
            key={`manage-chrome-${id}-${i}`}
            handleColorChange={handleColorChange}
            deleteChroma={deleteChroma}
          />
        ))}
        <AddChroma id={id} setChromaArr={setChromaArr} chromas={chromas} />
      </div>
    </div>
  );
};

export default ManageChromas;
