// @flow

import * as R from "ramda";
import { fillRow } from "../../utils";

import {
  SET_TABLE,
  ADD_ROW,
  DELETE_ROW,
  ADD_AMOUNT,
  SET_CLOSE_VALUES,
  SET_ROW_PERCENTS
} from "../actions/types";

import type { ActionType } from "../actions/tableActions";

export type Table = string[];
export type Cells = {
  [key: string]: {
    id: string,
    amount: number
  }
};
export type Rows = {
  [key: string]: string[]
};
export type ColumnSumRow = string[];
export type RowPercents = {
  [key: string]: string
};
export type ColumnSum = {
  [key: string]: {
    id: string,
    value: number
  }
};
export type CloseValues = {
  [key: string]: {
    id: string,
    amount: number
  }
};

export type State = {
  +table: Table,
  +rows: Rows,
  +cells: Cells,
  +columnSumRow: ColumnSumRow,
  +columnSum: ColumnSum,
  +closeValues: CloseValues,
  +rowPercents: RowPercents,
  +x: number
};

export type Store = {
  table: State
};

export const initialState: State = {
  table: [],
  rows: {},
  cells: {},
  columnSumRow: [],
  columnSum: {},
  closeValues: {},
  rowPercents: {},
  x: 0
};

export type Dispatch = (action: ActionType) => void;

const tableReducer = (
  state: State = initialState,
  action: ActionType
): State => {
  let table: Table = [];
  let rows: Rows = {};
  let cells: Cells = {};
  let columnSum: ColumnSum = {};

  switch (action.type) {
    case SET_TABLE:
      let rowId: string;

      for (let i = 0; i < action.payload.m; i++) {
        rowId = `${i}`;

        table.push(rowId);

        const { newCells, newRow: row } = fillRow(action.payload.n, rowId);

        cells = { ...cells, ...newCells };

        rows[rowId] = row;
      }

      //

      const columnSumRow = rows[table[0]].map((cId, index) => {
        columnSum[`averageColumn${index}`] = {
          id: `averageColumn${index}`,
          value: table.reduce((a, b) => cells[rows[b][index]].amount + a, 0)
        };

        return `averageColumn${index}`;
      });

      return {
        ...state,
        table,
        rows,
        cells,
        columnSum,
        columnSumRow,
        x: action.payload.x
      };
    case ADD_ROW:
      let newRowId = `${parseInt(state.table[state.table.length - 1], 10) + 1}`;

      columnSum = R.clone(state.columnSum);

      const { newCells, newRow } = fillRow(
        state.rows[state.table[0]].length,
        newRowId
      );

      state.columnSumRow.forEach(
        (idx, index) => (columnSum[idx].value += newCells[newRow[index]].amount)
      );

      return {
        ...state,
        table: [...state.table, newRowId],
        rows: { ...state.rows, [newRowId]: newRow },
        cells: { ...state.cells, ...newCells },
        columnSum
      };
    case DELETE_ROW:
      rows = { ...state.rows };
      cells = { ...state.cells };
      columnSum = R.clone(state.columnSum);

      for (let i = 0, len = state.rows[state.table[0]].length; i < len; i++) {
        columnSum[state.columnSumRow[i]].value -=
          cells[rows[action.payload][i]].amount;
        delete cells[state.rows[action.payload][i]];
      }

      delete rows[action.payload];

      table = state.table.filter(row => row !== action.payload);

      return {
        ...state,
        cells,
        table,
        rows,
        columnSum
      };
    case ADD_AMOUNT:
      cells = R.clone(state.cells);
      columnSum = R.clone(state.columnSum);

      cells[action.payload.cellId].amount++;

      columnSum[state.columnSumRow[action.payload.cellIndex]].value++;

      return {
        ...state,
        cells,
        columnSum
      };
    case SET_CLOSE_VALUES:
      const closeValues: CloseValues = {};

      if (typeof action.payload === "string") {
        const cell = state.cells[action.payload];
        let cv: Array<{ amount: number, id: string }> = [];
        let index = 0;
        for (let key in state.cells) {
          cv[index] = {
            ...state.cells[key],
            amount: Math.abs(state.cells[key].amount - cell.amount)
          };

          index++;
        }

        cv = cv.sort((a, b) => a.amount - b.amount).slice(0, state.x + 1);

        for (let i = 0; i < cv.length; i++) {
          closeValues[cv[i].id] = cv[i];
        }
      }

      return {
        ...state,
        closeValues
      };
    case SET_ROW_PERCENTS:
      const rowPercents: RowPercents = {};

      if (action.payload !== "clean") {
        const sum: number = state.rows[action.payload].reduce(
          (a, b) => state.cells[b].amount + a,
          0
        );

        for (let i = 0, len = state.rows[state.table[0]].length; i < len; i++) {
          rowPercents[state.rows[action.payload][i]] =
            (
              Math.round(
                ((100 * state.cells[state.rows[action.payload][i]].amount) /
                  sum) *
                  100
              ) / 100
            ).toString() + "%";
        }
      }

      return {
        ...state,
        rowPercents
      };
    default:
      return state;
  }
};

export default tableReducer;
