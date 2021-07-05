import { VirtualElement } from "@popperjs/core";
import { Dispatch, SetStateAction } from "react";

export interface ColorPickerProps {
  referenceElement: Element | VirtualElement | null | undefined;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  color: string;
  onChange(newColor: string): void;
}
