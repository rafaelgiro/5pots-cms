import { Dispatch, SetStateAction } from "react";

export interface LightboxProps {
  images: string[];
}

export interface LightboxImageProps {
  img: string;
  setZoom: Dispatch<SetStateAction<boolean>>;
  zoom: boolean;
  active: boolean;
}
