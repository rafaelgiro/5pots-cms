import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { LightboxImageProps } from "./interfaces";

import styles from "./styles.module.scss";

const LightboxImage = (props: LightboxImageProps) => {
  const { img, active, setZoom, zoom } = props;
  const [size, setSize] = useState<{
    height: number | string;
    width: number | string;
  }>({
    height: 0,
    width: 0,
  });
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (zoom && active && imgRef.current) {
      setSize({
        height: imgRef.current.naturalHeight / 1.2,
        width: imgRef.current.naturalWidth / 1.2,
      });
    } else if (active && imgRef.current) {
      setSize({
        height: "auto",
        width: "auto",
      });
    } else {
      setSize({
        height: 0,
        width: 0,
      });
    }
  }, [zoom, active]);

  return (
    <img
      style={size}
      ref={imgRef}
      className={clsx(
        styles.lightbox__img,
        active && styles["lightbox__img--visible"],
        zoom && styles["lightbox__img--zoom"]
      )}
      key={img}
      src={img}
      onDoubleClick={() => setZoom(!zoom)}
    />
  );
};

export default LightboxImage;
