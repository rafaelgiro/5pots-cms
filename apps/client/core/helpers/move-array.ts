// https://github.com/sindresorhus/array-move/blob/main/index.js

"use strict";

export const arrayMoveMutate = (array: unknown[], from: number, to: number) => {
  const startIndex = from < 0 ? array.length + from : from;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = to < 0 ? array.length + to : to;

    const [item] = array.splice(from, 1);
    array.splice(endIndex, 0, item);
  }
};

export const arrayMove = (array: any[], from: number, to: number) => {
  array = [...array];
  arrayMoveMutate(array, from, to);
  return array;
};
