import { useContext, useRef } from "react";
import MdFormatPaint from "@meronex/icons/md/MdFormatPaint";

import Typography from "../../../atoms/Typography";

import { AddChromaProps } from "./interfaces";

import styles from "./styles.module.scss";
import { uploadImage } from "../../../../core/helpers/uploadImage";
import UIContext from "../../../../core/contexts/UIContext";

const AddChroma = (props: AddChromaProps) => {
  const { chromas, id, setChromaArr } = props;
  const uploadRef = useRef<HTMLInputElement>(null);
  const { uiDispatch: dispatch } = useContext(UIContext);
  const newIndex = chromas.length;

  function handleUpload(image: FileList | null) {
    const token = localStorage.getItem("token");
    const fileName = `${id}-chroma-${newIndex}`;

    if (image && token)
      uploadImage(image, token, dispatch, fileName, false, () =>
        setChromaArr([...chromas, "#000000"])
      );
  }

  return (
    <button
      className={styles.chroma__add}
      onClick={() => uploadRef.current?.click()}
    >
      <MdFormatPaint />
      <Typography component="p" variant="p">
        NOVO
      </Typography>
      <input
        ref={uploadRef}
        className={styles.chroma__input}
        type="file"
        onChange={(e) => handleUpload(e.target.files)}
      />
    </button>
  );
};

export default AddChroma;
