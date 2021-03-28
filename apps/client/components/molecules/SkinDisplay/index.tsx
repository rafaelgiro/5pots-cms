import clsx from "clsx";
import { useContext, useState } from "react";
import { PhotoSwipe } from "react-photoswipe";
import UIContext from "../../../core/contexts/UIContext";
import CurrencyIcons from "../../atoms/Icons/CurrencyIcons";
import Lightbox from "../../atoms/Lightbox";
import Typography from "../../atoms/Typography";
import Chromas from "./Chromas";

import { SkinDisplayProps } from "./interfaces";

import styles from "./styles.module.scss";

const SkinDisplay = (props: SkinDisplayProps) => {
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
  const { uiDispatch: dispatch } = useContext(UIContext);

  const skinTier = { 1350: "Épica", 1820: "Lendária", 3250: "Ultimate" };

  const baseURL = "https://assets.5pots.com/file/cincopots/pbe";

  const images = [
    `https://assets.5pots.com/file/cincopots/pbe/blitz-groove-loading.jpg`,
    `https://assets.5pots.com/file/cincopots/pbe/blitz-groove-splash.jpg`,
    `https://assets.5pots.com/file/cincopots/pbe/blitz-groove-still.jpg`,
    `https://assets.5pots.com/file/cincopots/pbe/blitz-groove-turn.jpg`,
    `https://assets.5pots.com/file/cincopots/pbe/blitz-groove-border.jpg`,
  ];

  const splashClass = clsx(
    styles["skin-display__splash"],
    (border || loading) && styles["skin-display__splash--border"]
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
          <button
            onClick={() =>
              dispatch({
                type: "SHOW_LIGHTBOX",
                lightbox: { images, current: 0 },
              })
            }
          >
            <img src={`${baseURL}/${id}-loading.jpg`} />
          </button>
        )}
        {splash && (
          <button
            onClick={() =>
              dispatch({
                type: "SHOW_LIGHTBOX",
                lightbox: { images, current: 1 },
              })
            }
          >
            <img src={`${baseURL}/${id}-splash.jpg`} />
          </button>
        )}
      </div>
      <div className={styles["skin-display__screenshots"]}>
        {still && (
          <button
            onClick={() =>
              dispatch({
                type: "SHOW_LIGHTBOX",
                lightbox: { images, current: 2 },
              })
            }
          >
            <img src={`${baseURL}/${id}-still.jpg`} />
          </button>
        )}

        {turn && (
          <button
            onClick={() =>
              dispatch({
                type: "SHOW_LIGHTBOX",
                lightbox: { images, current: 3 },
              })
            }
          >
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
            <button
              onClick={() =>
                dispatch({
                  type: "SHOW_LIGHTBOX",
                  lightbox: { images, current: 0 },
                })
              }
            >
              <img src={`${baseURL}/${id}-border.jpg`} />
            </button>
          )}
        </div>
        <Chromas chromas={chromas} id={id} />
      </div>
    </div>
  );
};

export default SkinDisplay;
