// @flow

import type { Cells } from "../redux/reducers/tableReducer";

export const fillRow = (
  n: number,
  i: string
): { newCells: Cells, newRow: string[] } => {
  const newCells: Cells = {};
  const newRow: string[] = [];

  function addCell(x: number) {
    if (x < n) {
      newRow.push(`${i}-${x}`);
      newCells[`${i}-${x}`] = {
        id: `${i}-${x}`,
        amount: Math.round(100 + Math.random() * (999 - 100))
      };

      addCell(x + 1);
    }
  }

  addCell(0);

  return { newCells, newRow };
};
