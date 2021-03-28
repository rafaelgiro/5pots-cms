/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { SwipeHandlerProps } from "./interfaces";

const SwipeHandler = (props: SwipeHandlerProps) => {
  const { children, ...handlerFunctions } = props;
  const [x, setX] = useState<number | null>();
  const [y, setY] = useState<number | null>();
  const [direction, setDirection] = useState<
    "onLeft" | "onRight" | "onTop" | "onDown"
  >();

  function handleTouchStart(event: TouchEvent) {
    setX(event.touches[0].clientX);
    setY(event.touches[0].clientY);
  }

  function handleTouchMove(event: TouchEvent) {
    if (!x || !y) return;

    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;

    const xDiff = x - xUp;
    const yDiff = y - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 5) {
        setDirection("onLeft");
      } else if (xDiff < -5) {
        setDirection("onRight");
      }
    } else if (yDiff > 5) {
      setDirection("onTop");
    } else if (yDiff < -5) {
      setDirection("onDown");
    }
  }

  function handleTouchEnd() {
    if (
      direction &&
      handlerFunctions[direction] &&
      typeof handlerFunctions[direction] === "function"
    ) {
      // @ts-ignore Calling Dynamic Object
      handlerFunctions[direction]();
    }

    setX(null);
    setY(null);
    setDirection(undefined);
  }

  return (
    <div
      // @ts-ignore Typescript Mismatch
      onTouchStart={handleTouchStart}
      // @ts-ignore Typescript Mismatch
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};

export default SwipeHandler;
