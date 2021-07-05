/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import MdDelete from "@meronex/icons/md/MdDelete";

import Typography from "../../../atoms/Typography";
import ColorPicker from "../../ColorPicker";

import { EditChromaProps } from "./interfaces";

import styles from "./styles.module.scss";

const EditChroma = (props: EditChromaProps) => {
  const {
    chromaColor,
    chromaIndex,
    id,
    handleColorChange,
    deleteChroma,
  } = props;
  const [referenceElement, setReferenceElement] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div className={styles.chroma}>
      <button>
        <img
          className={styles.chroma__preview}
          src={`https://assets.5pots.com/file/cincopots/pbe/${id}-chroma-${chromaIndex}.png`}
        />
      </button>
      <button
        className={styles.chroma__info}
        // @ts-ignore
        ref={setReferenceElement}
        onClick={() => setPickerOpen(!pickerOpen)}
      >
        <Typography component="span" variant="sub">
          {chromaColor}
        </Typography>
        <div
          style={{ backgroundColor: chromaColor }}
          className={styles.chroma__color}
        />
      </button>
      <ColorPicker
        referenceElement={referenceElement}
        isOpen={pickerOpen}
        setIsOpen={setPickerOpen}
        color={chromaColor}
        onChange={(val) => handleColorChange(chromaIndex, val)}
      />

      <MdDelete
        onClick={() => deleteChroma(chromaIndex)}
        className={styles["remove-btn"]}
      />
    </div>
  );
};

export default EditChroma;
