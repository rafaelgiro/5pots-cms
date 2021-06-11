import clsx from "clsx";
import { useContext, useRef } from "react";
import MdDelete from "@meronex/icons/md/MdDelete";
import UIContext from "../../../../core/contexts/UIContext";
import CurrencyIcons from "../../../atoms/Icons/CurrencyIcons";
import Typography from "../../../atoms/Typography";
import EditContext from "../../../templates/PostEdit/EditContext";
import Chromas from "../Chromas";
import { imgType } from "./interfaces";

import styles from "../styles.module.scss";
import editStyles from "./styles.module.scss";
import { uploadImage } from "../../../../core/helpers/uploadImage";
import ContentEditable from "react-contenteditable";
import SimpleSelect from "../../../atoms/SimpleSelect";

const SkinDisplayEdit = (props: Skin) => {
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
    gemstone,
  } = props;
  const { postState, setPostState } = useContext(EditContext);
  const { uiDispatch: dispatch } = useContext(UIContext);
  const loadingUploadRef = useRef<HTMLInputElement>(null);
  const splashUploadRef = useRef<HTMLInputElement>(null);
  const stillUploadRef = useRef<HTMLInputElement>(null);
  const turnUploadRef = useRef<HTMLInputElement>(null);
  const borderUploadRef = useRef<HTMLInputElement>(null);
  const skinSectionIndex = postState?.sections.findIndex(
    (section) => section.skins
  );

  const skinTier: Record<string, string> = {
    "1350": "Épica",
    "1820": "Lendária",
    "3250": "Ultimate",
  };

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

  const priceOptions = [
    { value: "975", label: "975" },
    { value: "1350", label: "1350" },
    { value: "1920", label: "1820" },
    { value: "3250", label: "3250" },
  ];

  function setAsset(asset: imgType) {
    if (postState && (skinSectionIndex || skinSectionIndex === 0)) {
      const newPost = { ...postState };
      const skinIndex = newPost.sections[skinSectionIndex].skins.findIndex(
        (s) => s.id === id
      );

      const assetAlreadyExists =
        newPost.sections[skinSectionIndex].skins[skinIndex][asset];

      if (!assetAlreadyExists) {
        newPost.sections[skinSectionIndex].skins[skinIndex][asset] = true;
        setPostState(newPost);
      }
    }
  }

  function unsetAsset(asset: imgType) {
    if (postState && (skinSectionIndex || skinSectionIndex === 0)) {
      const newPost = { ...postState };
      const skinIndex = newPost.sections[skinSectionIndex].skins.findIndex(
        (s) => s.id === id
      );

      newPost.sections[skinSectionIndex].skins[skinIndex][asset] = false;
      setPostState(newPost);
    }
  }

  function handleUpload(image: FileList | null, type: imgType) {
    const token = localStorage.getItem("token");
    const fileName = `${id}-${type}`;

    if (image && token)
      uploadImage(image, token, dispatch, fileName, true, () => setAsset(type));
  }

  function handleDetailChange(key: string, value: string) {
    if (postState && (skinSectionIndex || skinSectionIndex === 0)) {
      const newPost = { ...postState };
      const skinIndex = newPost.sections[skinSectionIndex].skins.findIndex(
        (s) => s.id === id
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newPost.sections[skinSectionIndex].skins[skinIndex][key] = value;
      setPostState(newPost);
    }
  }

  function handleCurrency(currency: "rp" | "gemstone" | "prestige") {
    if (postState && (skinSectionIndex || skinSectionIndex === 0)) {
      const newPost = { ...postState };
      const skinIndex = newPost.sections[skinSectionIndex].skins.findIndex(
        (s) => s.id === id
      );

      if (currency === "rp") {
        newPost.sections[skinSectionIndex].skins[skinIndex].gemstone = false;
        newPost.sections[skinSectionIndex].skins[skinIndex].prestige = false;
      } else if (currency === "gemstone") {
        newPost.sections[skinSectionIndex].skins[skinIndex].gemstone = true;
        newPost.sections[skinSectionIndex].skins[skinIndex].prestige = false;
      } else {
        newPost.sections[skinSectionIndex].skins[skinIndex].gemstone = false;
        newPost.sections[skinSectionIndex].skins[skinIndex].prestige = true;
      }

      setPostState(newPost);
    }
  }

  return (
    <div className={clsx(styles["skin-display"], editStyles.edit)}>
      <div className={styles["skin-display__title"]}>
        <Typography
          variant="sub"
          component="h6"
          className={editStyles.editable}
        >
          <ContentEditable
            tagName="span"
            html={id}
            onChange={(e) => handleDetailChange("id", e.target.value)}
          />
        </Typography>
        <Typography variant="h4" component="h4" className={editStyles.editable}>
          <ContentEditable
            tagName="span"
            html={name}
            onChange={(e) => handleDetailChange("name", e.target.value)}
          />
        </Typography>
        <div className={editStyles.currency}>
          <input
            type="radio"
            name="currency"
            value="rp"
            id="rp"
            checked={!gemstone && !prestige}
            onChange={() => handleCurrency("rp")}
          />
          <label htmlFor="rp">Riot Points</label>
          <input
            type="radio"
            name="currency"
            value="hextech"
            id="hextech"
            checked={gemstone}
            onChange={() => handleCurrency("gemstone")}
          />
          <label htmlFor="hextech">Hextech Gems</label>
          <input
            type="radio"
            name="currency"
            value="prestige"
            id="prestige"
            checked={prestige}
            onChange={() => handleCurrency("prestige")}
          />
          <label htmlFor="prestige">Prestige Points</label>
        </div>
        <div
          className={clsx(
            styles["skin-display__title__price"],
            editStyles["skin-price"]
          )}
        >
          <Typography variant="h4" component="h5">
            Skin{" "}
          </Typography>
          <SimpleSelect
            className={clsx(editStyles.select)}
            options={priceOptions}
            handleChange={(val) => console.log(val)}
            defaultValue={price}
          />
          <CurrencyIcons currency={skinCurrency.currency} />
        </div>
      </div>
      <Typography
        variant="p"
        component="p"
        className={clsx(
          styles["skin-display__description"],
          editStyles.editable
        )}
      >
        <ContentEditable
          tagName="span"
          html={description}
          onChange={(e) => handleDetailChange("description", e.target.value)}
        />
      </Typography>
      <div className={splashClass}>
        <div className={editStyles["asset-container"]}>
          <button onClick={() => loadingUploadRef.current?.click()}>
            {loading && <img src={`${baseURL}/${id}-loading.jpg`} />}
          </button>
          <input
            ref={loadingUploadRef}
            className={editStyles["editable--invisible"]}
            type="file"
            onChange={(e) => handleUpload(e.target.files, "loading")}
          />
          {loading && (
            <MdDelete
              onClick={() => unsetAsset("loading")}
              className={editStyles["remove-btn"]}
            />
          )}
        </div>

        <div className={editStyles["asset-container"]}>
          <button onClick={() => splashUploadRef.current?.click()}>
            {splash && <img src={`${baseURL}/${id}-splash.jpg`} />}
          </button>
          <input
            ref={splashUploadRef}
            className={editStyles["editable--invisible"]}
            type="file"
            onChange={(e) => handleUpload(e.target.files, "splash")}
          />
          {splash && (
            <MdDelete
              onClick={() => unsetAsset("splash")}
              className={editStyles["remove-btn"]}
            />
          )}
        </div>
      </div>
      <div className={styles["skin-display__screenshots"]}>
        <div className={editStyles["asset-container"]}>
          <button onClick={() => stillUploadRef.current?.click()}>
            {still && <img src={`${baseURL}/${id}-still.jpg`} />}
          </button>
          <input
            ref={stillUploadRef}
            className={editStyles["editable--invisible"]}
            type="file"
            onChange={(e) => handleUpload(e.target.files, "still")}
          />
          {still && (
            <MdDelete
              onClick={() => unsetAsset("still")}
              className={editStyles["remove-btn"]}
            />
          )}
        </div>

        <div className={editStyles["asset-container"]}>
          <button onClick={() => turnUploadRef.current?.click()}>
            {turn && <img src={`${baseURL}/${id}-turn.jpg`} />}
          </button>
          <input
            ref={turnUploadRef}
            className={editStyles["editable--invisible"]}
            type="file"
            onChange={(e) => handleUpload(e.target.files, "turn")}
          />
          {turn && (
            <MdDelete
              onClick={() => unsetAsset("turn")}
              className={editStyles["remove-btn"]}
            />
          )}
        </div>

        <div className={editStyles.url}>
          <Typography variant="p" component="p">
            Spotlight
          </Typography>
          <Typography variant="sub" component="p">
            <ContentEditable
              tagName="span"
              html={spotlight}
              onChange={(e) => handleDetailChange("spotlight", e.target.value)}
            />
          </Typography>
        </div>
        <div
          className={clsx(
            styles["skin-display__video"],
            editStyles["asset-container"]
          )}
        >
          {spotlight && (
            <iframe
              src={`https://www.youtube.com/embed/${spotlight.split("v=")[1]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <div className={editStyles.url}>
          <Typography variant="p" component="p">
            Voice over
          </Typography>
          <Typography variant="sub" component="p">
            <ContentEditable
              tagName="span"
              html={vo}
              onChange={(e) => handleDetailChange("vo", e.target.value)}
            />
          </Typography>
        </div>
        <div
          className={clsx(
            styles["skin-display__video"],
            editStyles["asset-container"]
          )}
        >
          {vo && (
            <iframe
              src={`https://www.youtube.com/embed/${vo.split("v=")[1]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <div className={editStyles.url}>
          <Typography variant="p" component="p">
            Special interactions
          </Typography>
          <Typography variant="sub" component="p">
            <ContentEditable
              tagName="span"
              html={interactions}
              onChange={(e) =>
                handleDetailChange("interactions", e.target.value)
              }
            />
          </Typography>
        </div>
        <div
          className={clsx(
            styles["skin-display__video"],
            editStyles["asset-container"]
          )}
        >
          {interactions && (
            <iframe
              src={`https://www.youtube.com/embed/${
                interactions.split("v=")[1]
              }`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
      <Typography
        variant="p"
        component="p"
        className={styles["skin-display__p"]}
      >
        A skin {name} {!border ? "(por enquanto?) não" : ""} possui uma borda
        para acompanhar a linha de skin.
        {!chromas.length ? " E (por enquanto?) não" : "Também"} teremos chromas{" "}
        {!chromas.length
          ? "inclusos no client :("
          : "que você confere logo abaixo :D"}
      </Typography>
      <div className={styles["skin-display__chromas-border"]}>
        <div className={editStyles["asset-container"]}>
          <button onClick={() => borderUploadRef.current?.click()}>
            {border && <img src={`${baseURL}/${id}-border.jpg`} />}
          </button>
          <input
            ref={borderUploadRef}
            className={editStyles["editable--invisible"]}
            type="file"
            onChange={(e) => handleUpload(e.target.files, "border")}
          />
          {border && (
            <MdDelete
              onClick={() => unsetAsset("border")}
              className={editStyles["remove-btn"]}
            />
          )}
        </div>
        <Chromas chromas={chromas} id={id} />
      </div>
    </div>
  );
};

export default SkinDisplayEdit;