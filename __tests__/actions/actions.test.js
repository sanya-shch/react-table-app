import {
  setTable,
  addRow,
  deleteRow,
  addAmount,
  setCloseValue,
  setRowPercents
} from "../../src/redux/actions/tableActions";

import * as types from "../../src/redux/actions/types";

describe("table actions", () => {
  test("actionCreator - setTable", () => {
    const data = setTable(100, 100, 30);
    expect(data).toEqual({
      type: types.SET_TABLE,
      payload: { m: 100, n: 100, x: 30 }
    });
  });

  test("actionCreator - addRow", () => {
    const data = addRow();
    expect(data).toEqual({ type: types.ADD_ROW });
  });

  test("actionCreator - deleteRow", () => {
    const data = deleteRow("100");
    expect(data).toEqual({ type: types.DELETE_ROW, payload: "100" });
  });

  test("actionCreator - addAmount", () => {
    const data = addAmount("0-0", 0);
    expect(data).toEqual({
      type: types.ADD_AMOUNT,
      payload: { cellId: "0-0", cellIndex: 0 }
    });
  });

  test("actionCreator - setCloseValue", () => {
    const data = setCloseValue("0-0");
    expect(data).toEqual({ type: types.SET_CLOSE_VALUES, payload: "0-0" });
  });

  test("actionCreator - setRowPercents", () => {
    const data = setRowPercents("100");
    expect(data).toEqual({ type: types.SET_ROW_PERCENTS, payload: "100" });
  });

  test("actionCreator - setCloseValue - second variant", () => {
    const data = setCloseValue();
    expect(data).toEqual({ type: types.SET_CLOSE_VALUES, payload: undefined });
  });

  test("actionCreator - setRowPercents - second variant", () => {
    const data = setRowPercents();
    expect(data).toEqual({ type: types.SET_ROW_PERCENTS, payload: undefined });
  });
});
