import { useContext, useState } from "react";
import MdClose from "@meronex/icons/md/MdClose";
import MdChevronLeft from "@meronex/icons/md/MdChevronLeft";
import MdChevronRight from "@meronex/icons/md/MdChevronRight";
import MdYoutubeSearchedFor from "@meronex/icons/md/MdYoutubeSearchedFor";

import SwipeHandler from "../SwipeHandler";
import LightboxImage from "./Image";

import { LightboxProps } from "./interfaces";

import styles from "./styles.module.scss";
import UIContext from "../../../core/contexts/UIContext";
import clsx from "clsx";

const Lightbox = () => {
  const { uiState: state, uiDispatch: dispatch } = useContext(UIContext);
  const [zoom, setZoom] = useState(false);

  const { lightbox } = state;
  const { images, visible, current } = lightbox;

  function handlePrevious(swipe: boolean) {
    if (swipe && zoom) return;
    if (images && current !== undefined) {
      const newPosition = (current + images.length - 1) % images.length;
      dispatch({
        type: "SHOW_LIGHTBOX",
        lightbox: { ...lightbox, current: newPosition },
      });
    }
  }

  function handleNext(swipe: boolean) {
    if (swipe && zoom) return;
    if (images && current !== undefined) {
      const newPosition = (current + 1) % images.length;
      dispatch({
        type: "SHOW_LIGHTBOX",
        lightbox: { ...lightbox, current: newPosition },
      });
    }
  }

  return (
    <div
      className={clsx(styles.lightbox, visible && styles["lightbox--visible"])}
    >
      <SwipeHandler
        onRight={() => handleNext(true)}
        onLeft={() => handlePrevious(true)}
      >
        <div className={styles.lightbox__controls}>
          {zoom && (
            <button
              onClick={() => setZoom(false)}
              className={styles["lightbox__controls--reset-zoom"]}
            >
              <MdYoutubeSearchedFor />
            </button>
          )}

          <button
            onClick={() => dispatch({ type: "HIDE_LIGHTBOX" })}
            className={styles["lightbox__controls--close"]}
          >
            <MdClose />
          </button>
          <button
            onClick={() => handlePrevious(false)}
            className={styles["lightbox__controls--previous"]}
          >
            <MdChevronLeft />
          </button>
          <button
            onClick={() => handleNext(false)}
            className={styles["lightbox__controls--next"]}
          >
            <MdChevronRight />
          </button>
        </div>

        <div className={styles.lightbox__content}>
          {images &&
            images.length &&
            images.map((img, i) => (
              <LightboxImage
                key={img}
                img={img}
                active={current === i}
                zoom={zoom}
                setZoom={setZoom}
              />
            ))}
        </div>
      </SwipeHandler>
    </div>
  );
};

export default Lightbox;
