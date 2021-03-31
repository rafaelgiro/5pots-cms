import clsx from "clsx";
import { useContext, useRef } from "react";
import UIContext from "../../../../core/contexts/UIContext";
import api from "../../../../core/services/api";
import CurrencyIcons from "../../../atoms/Icons/CurrencyIcons";
import Typography from "../../../atoms/Typography";
import EditContext from "../../../templates/PostEdit/EditContext";
import Chromas from "../Chromas";
import { imgType } from "./interfaces";
import { SkinDisplayProps } from "../interfaces";

import styles from "../styles.module.scss";
import editStyles from "./styles.module.scss";
import { uploadImage } from "../../../../core/helpers/uploadImage";

const SkinDisplayEdit = (props: SkinDisplayProps) => {
  const {
    border,
    chromas,
    id,
    interactions,
    name,
    prestige,
    price,
    splash,
    loading,
    spotlight,
    still,
    turn,
    vo,
    description,
    pass,
    gemstone,
  } = props;
  const {
    postState,
    setPostState,
    championSectionIndex,
    setHasChanged,
  } = useContext(EditContext);
  const { uiDispatch: dispatch } = useContext(UIContext);
  const loadingUploadRef = useRef<HTMLInputElement>(null);

  const skinTier = { 1350: "Épica", 1820: "Lendária", 3250: "Ultimate" };

  const baseURL = "https://assets.5pots.com/file/cincopots/pbe";

  const splashClass = clsx(
    styles["skin-display__splash"],
    border && styles["skin-display__splash--border"]
  );

  const skinCurrency: {
    price: string;
    currency: "gemstone" | "rp" | "be" | "prestige";
  } = { price: "", currency: "rp" };

  if (gemstone) {
    skinCurrency.price = "Hextech - 10";
    skinCurrency.currency = "gemstone";
  } else if (prestige) {
    skinCurrency.price = "Prestígio";
    skinCurrency.currency = "prestige";
  } else {
    skinCurrency.price = `${skinTier[price]} - ${price}`;
    skinCurrency.currency = "rp";
  }

  function handleUpload(image: FileList | null, type: imgType) {
    const token = localStorage.getItem("token");
    const fileName = `${id}-${type}`;

    if (image && token)
      uploadImage(image, token, dispatch, fileName, true, console.log);
  }

  return (
    <div className={styles["skin-display"]}>
      <div className={styles["skin-display__title"]}>
        <Typography variant="h4" component="h4">
          {name}
        </Typography>
        <div className={styles["skin-display__title__price"]}>
          <Typography variant="h4" component="h5">
            Skin {skinCurrency.price}
          </Typography>
          <CurrencyIcons currency={skinCurrency.currency} />
        </div>
      </div>
      <Typography
        variant="p"
        component="p"
        className={styles["skin-display__description"]}
      >
        {description}
      </Typography>
      <div className={splashClass}>
        {loading && (
          <>
            <button onClick={() => loadingUploadRef.current?.click()}>
              <img src={`${baseURL}/${id}-loading.jpg`} />
            </button>
            <input
              ref={loadingUploadRef}
              className={editStyles["editable--invisible"]}
              type="file"
              onChange={(e) => handleUpload(e.target.files, "loading")}
            />
          </>
        )}
        {splash && (
          <button>
            <img src={`${baseURL}/${id}-splash.jpg`} />
          </button>
        )}
      </div>
      <div className={styles["skin-display__screenshots"]}>
        {still && (
          <button>
            <img src={`${baseURL}/${id}-still.jpg`} />
          </button>
        )}

        {turn && (
          <button>
            <img src={`${baseURL}/${id}-turn.jpg`} />
          </button>
        )}
        {spotlight && (
          <div className={styles["skin-display__video"]}>
            <iframe
              src={`https://www.youtube.com/embed/${spotlight.split("v=")[1]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
      <Typography
        variant="p"
        component="p"
        className={styles["skin-display__p"]}
      >
        A skin {name} {!pass ? "não" : ""} faz parte de um passe, por isso{" "}
        {!pass ? "não" : ""} teremos uma borda para acompanhar a linha de skin!
        Também {!chromas.length ? "não" : ""} teremos chromas{" "}
        {!chromas.length ? ":(" : "que você confere logo abaixo :D"}
      </Typography>
      <div className={styles["skin-display__chromas-border"]}>
        <div>
          {border && (
            <button>
              <img src={`${baseURL}/${id}-border.jpg`} />
            </button>
          )}
        </div>
        <Chromas chromas={chromas} id={id} />
      </div>
    </div>
  );
};

export default SkinDisplayEdit;
