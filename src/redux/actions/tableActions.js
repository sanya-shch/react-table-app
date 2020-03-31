// @flow

import {
  SET_TABLE,
  ADD_ROW,
  DELETE_ROW,
  ADD_AMOUNT,
  SET_CLOSE_VALUES,
  SET_ROW_PERCENTS
} from "./types";

type ExtractReturn<Fn> = $Call<<T>((...Array<any>) => T) => T, Fn>;

export type ActionType =
  | ExtractReturn<typeof setTable>
  | ExtractReturn<typeof addRow>
  | ExtractReturn<typeof deleteRow>
  | ExtractReturn<typeof addAmount>
  | ExtractReturn<typeof setCloseValue>
  | ExtractReturn<typeof setRowPercents>;

export function setTable(m: number, n: number, x: number) {
  return {
    type: SET_TABLE,
    payload: { m, n, x }
  };
}

export function addRow() {
  return {
    type: ADD_ROW
  };
}

export function deleteRow(rowId: string) {
  return {
    type: DELETE_ROW,
    payload: rowId
  };
}

export function addAmount(cellId: string, cellIndex: number) {
  return {
    type: ADD_AMOUNT,
    payload: { cellId, cellIndex }
  };
}

export function setCloseValue(id: ?string) {
  return {
    type: SET_CLOSE_VALUES,
    payload: id
  };
}

export function setRowPercents(id: string) {
  return {
    type: SET_ROW_PERCENTS,
    payload: id
  };
}
