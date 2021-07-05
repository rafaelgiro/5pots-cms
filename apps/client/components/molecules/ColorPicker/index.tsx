/* eslint-disable @typescript-eslint/ban-ts-comment */
import clsx from "clsx";
import { useState } from "react";
import { SwatchesPicker } from "react-color";
import { usePopper } from "react-popper";

import { ColorPickerProps } from "./interfaces";
import cssStyles from "./styles.module.scss";

const ColorPicker = (props: ColorPickerProps) => {
  const { referenceElement, isOpen, onChange } = props;
  const [arrowElement, setArrowElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  });

  return (
    <div
      // @ts-ignore
      ref={setPopperElement}
      style={styles.popper}
      {...attributes.popper}
      className={clsx(cssStyles.picker, isOpen && cssStyles.visible)}
    >
      <SwatchesPicker onChangeComplete={(val) => onChange(val.hex)} />
      {/* @ts-ignore */}
      <div ref={setArrowElement} style={styles.arrow} />
    </div>
  );
};

export default ColorPicker;
