import { useState } from "react";
import clsx from "clsx";

import MdKeyboardArrowUp from "@meronex/icons/md/MdKeyboardArrowUp";
import MdKeyboardArrowDown from "@meronex/icons/md/MdKeyboardArrowDown";
import MdLens from "@meronex/icons/md/MdLens";

import Typography from "../../atoms/Typography";

import hardCodedSkins from "./hardCodedSkins";

import { SlideProps } from "./interfaces";
import styles from "./styles.module.scss";

const SkinSlideshow = () => {
  // const [skins, setSkin] = useState(hardCodedSkins);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);
  const skins = hardCodedSkins;

  // Estilo pra fazer o translate da transição
  const wrapperStyles = {
    transform: `translateY(${translateValue}rem)`,
  };

  // Calcula o tanto que tem que andar
  const slideHeight = () => {
    return 40; // 40rem
  };

  // Muda para o slide anterior se não estiver no primeiro
  const goToPrevSlide = () => {
    if (currentIndex === 0) return;

    setCurrentIndex(currentIndex - 1);
    setTranslateValue(translateValue + slideHeight());
  };

  // Anda com o slider
  const goToNextSlide = () => {
    if (currentIndex === skins.length - 1) {
      // Descomentar se eu quiser continuar indo pra frente no futuro
      // setCurrentIndex(0);
      // setTranslateValue(0);
      return;
    }

    setCurrentIndex(currentIndex + 1);
    setTranslateValue(translateValue - slideHeight());
  };

  // Renderiza cada slide único do slideshow
  const renderSkins = () => {
    const slides = skins.map((skin) => {
      return (
        <Slide key={skin.name} image={skin.image} position={skin.position} />
      );
    });

    return slides;
  };

  // Renderiza os pontinhos do controle
  const renderBulletPoints = () => {
    const bullets = skins.map((skin, i) => {
      return (
        <MdLens
          key={`skin-bullet-${skin.name}`}
          id={`skin-bullet-${i}`}
          className={clsx(
            styles["skin-slideshow__controls__bullet"],
            currentIndex === i &&
              styles["skin-slideshow__controls__bullet--active"]
          )}
        />
      );
    });

    return bullets;
  };

  return (
    <div className="skins-sidebar">
      <Typography className={styles.sidebar__title} component="h4" variant="h4">
        Novas skins no PBE
      </Typography>
      <div className={styles["skin-slideshow__general-container"]}>
        <div className={styles["skin-slideshow"]}>
          <div
            style={wrapperStyles}
            className={styles["skin-slideshow__wrapper"]}
          >
            {renderSkins()}
          </div>
          <div className={styles["skin-slideshow__details"]}>
            <Typography component="p" variant="p">
              <span className={styles["skin-slideshow__details__title"]}>
                {skins[currentIndex].name}
              </span>
              <span className={styles["skin-slideshow__details__tier"]}>
                Skin {skins[currentIndex].tier} -{" "}
              </span>
              {skins[currentIndex].price}
              <img
                alt={skins[currentIndex].name}
                className={styles["skin-slideshow__details__currency"]}
                src={skins[currentIndex].currency}
              />
            </Typography>
          </div>
        </div>
        <div className={styles["skin-slideshow__controls"]}>
          <MdKeyboardArrowUp
            className={clsx(
              styles["skin-slideshow__controls__arrow"],
              currentIndex === 0 &&
                styles["skin-slideshow__controls__arrow--disabled"]
            )}
            onClick={goToPrevSlide}
          />
          {renderBulletPoints()}
          <MdKeyboardArrowDown
            className={clsx(
              styles["skin-slideshow__controls__arrow"],
              currentIndex === skins.length - 1 &&
                styles["skin-slideshow__controls__arrow--disabled"]
            )}
            onClick={goToNextSlide}
          />
        </div>
      </div>
    </div>
  );
};

// Componente de helper pra fazer o Slide individual
const Slide = (props: SlideProps) => {
  const { image, position } = props;
  const inlineStyles = {
    backgroundImage: `url(${image})`,
    backgroundPosition: position,
  };
  return (
    <div style={inlineStyles} className={styles["skin-slideshow__slide"]} />
  );
};

export default SkinSlideshow;
