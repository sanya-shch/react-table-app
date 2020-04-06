// @flow

import type { Cells } from "./tableReducer";

export const fillRow = (
  n: number,
  i: string
): { newCells: Cells, newRow: string[] } => {
  const newCells: Cells = {};
  const newRow: string[] = Array.from({ length: n }, (v, k) => {
    newCells[`${i}-${k}`] = {
      id: `${i}-${k}`,
      amount: Math.round(100 + Math.random() * (999 - 100))
    };

    return `${i}-${k}`;
  });

  return { newCells, newRow };
};
