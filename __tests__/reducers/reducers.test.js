import { mockRandom, resetMockRandom } from "jest-mock-random";
import { createStore } from "redux";
import tableReducer from "../../src/redux/reducers/tableReducer";
import {
  setTable,
  addRow,
  deleteRow,
  addAmount,
  setCloseValue,
  setRowPercents
} from "../../src/redux/actions/tableActions";

describe("test table reducer", () => {
  let store;
  let testStore = {};

  beforeEach(() => {
    store = createStore(tableReducer, testStore);
  });

  test("should handle SET_TABLE", () => {
    mockRandom([
      0.5712301,
      0.6412302,
      0.2612303,
      0.7812304,
      0.6712305,
      0.1712306,
      0.9812307,
      0.9112308,
      0.7212309
    ]);

    store.dispatch(setTable(3, 3, 3));

    expect(store.getState()).toEqual({
      cells: {
        "0-0": { amount: 614, id: "0-0" },
        "0-1": { amount: 676, id: "0-1" },
        "0-2": { amount: 335, id: "0-2" },
        "1-0": { amount: 802, id: "1-0" },
        "1-1": { amount: 703, id: "1-1" },
        "1-2": { amount: 254, id: "1-2" },
        "2-0": { amount: 982, id: "2-0" },
        "2-1": { amount: 919, id: "2-1" },
        "2-2": { amount: 748, id: "2-2" }
      },
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 2398 },
        averageColumn1: { id: "averageColumn1", value: 2298 },
        averageColumn2: { id: "averageColumn2", value: 1337 }
      },
      columnSumRow: ["averageColumn0", "averageColumn1", "averageColumn2"],
      rows: {
        "0": ["0-0", "0-1", "0-2"],
        "1": ["1-0", "1-1", "1-2"],
        "2": ["2-0", "2-1", "2-2"]
      },
      table: ["0", "1", "2"],
      x: 3
    });

    resetMockRandom();

    testStore = store.getState();
  });

  test("should handle ADD_ROW", () => {
    mockRandom([0.7539901, 0.1248502, 0.3596403]);

    store.dispatch(addRow());

    expect(store.getState()).toEqual({
      cells: {
        "0-0": { amount: 614, id: "0-0" },
        "0-1": { amount: 676, id: "0-1" },
        "0-2": { amount: 335, id: "0-2" },
        "1-0": { amount: 802, id: "1-0" },
        "1-1": { amount: 703, id: "1-1" },
        "1-2": { amount: 254, id: "1-2" },
        "2-0": { amount: 982, id: "2-0" },
        "2-1": { amount: 919, id: "2-1" },
        "2-2": { amount: 748, id: "2-2" },
        "3-0": { amount: 778, id: "3-0" },
        "3-1": { amount: 212, id: "3-1" },
        "3-2": { amount: 423, id: "3-2" }
      },
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 3176 },
        averageColumn1: { id: "averageColumn1", value: 2510 },
        averageColumn2: { id: "averageColumn2", value: 1760 }
      },
      columnSumRow: ["averageColumn0", "averageColumn1", "averageColumn2"],
      rows: {
        "0": ["0-0", "0-1", "0-2"],
        "1": ["1-0", "1-1", "1-2"],
        "2": ["2-0", "2-1", "2-2"],
        "3": ["3-0", "3-1", "3-2"]
      },
      table: ["0", "1", "2", "3"],
      x: 3
    });

    resetMockRandom();
  });

  test("should handle DELETE_ROW", () => {
    store.dispatch(deleteRow("1"));

    expect(store.getState()).toEqual({
      cells: {
        "0-0": { amount: 614, id: "0-0" },
        "0-1": { amount: 676, id: "0-1" },
        "0-2": { amount: 335, id: "0-2" },
        "2-0": { amount: 982, id: "2-0" },
        "2-1": { amount: 919, id: "2-1" },
        "2-2": { amount: 748, id: "2-2" }
      },
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 1596 },
        averageColumn1: { id: "averageColumn1", value: 1595 },
        averageColumn2: { id: "averageColumn2", value: 1083 }
      },
      columnSumRow: ["averageColumn0", "averageColumn1", "averageColumn2"],
      rows: { "0": ["0-0", "0-1", "0-2"], "2": ["2-0", "2-1", "2-2"] },
      table: ["0", "2"],
      x: 3
    });
  });

  test("should handle ADD_AMOUNT", () => {
    store.dispatch(addAmount("0-0", 0));

    expect(store.getState()).toEqual({
      cells: {
        "0-0": { amount: 615, id: "0-0" },
        "0-1": { amount: 676, id: "0-1" },
        "0-2": { amount: 335, id: "0-2" },
        "1-0": { amount: 802, id: "1-0" },
        "1-1": { amount: 703, id: "1-1" },
        "1-2": { amount: 254, id: "1-2" },
        "2-0": { amount: 982, id: "2-0" },
        "2-1": { amount: 919, id: "2-1" },
        "2-2": { amount: 748, id: "2-2" }
      },
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 2399 },
        averageColumn1: { id: "averageColumn1", value: 2298 },
        averageColumn2: { id: "averageColumn2", value: 1337 }
      },
      columnSumRow: ["averageColumn0", "averageColumn1", "averageColumn2"],
      rows: {
        "0": ["0-0", "0-1", "0-2"],
        "1": ["1-0", "1-1", "1-2"],
        "2": ["2-0", "2-1", "2-2"]
      },
      table: ["0", "1", "2"],
      x: 3
    });
  });

  test("should handle SET_CLOSE_VALUES", () => {
    store.dispatch(setCloseValue("0-0"));

    expect(store.getState()).toEqual({
      cells: {
        "0-0": { amount: 614, id: "0-0" },
        "0-1": { amount: 676, id: "0-1" },
        "0-2": { amount: 335, id: "0-2" },
        "1-0": { amount: 802, id: "1-0" },
        "1-1": { amount: 703, id: "1-1" },
        "1-2": { amount: 254, id: "1-2" },
        "2-0": { amount: 982, id: "2-0" },
        "2-1": { amount: 919, id: "2-1" },
        "2-2": { amount: 748, id: "2-2" }
      },
      closeValues: {
        "0-0": { amount: 0, id: "0-0" },
        "0-1": { amount: 62, id: "0-1" },
        "1-1": { amount: 89, id: "1-1" },
        "2-2": { amount: 134, id: "2-2" }
      },
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 2398 },
        averageColumn1: { id: "averageColumn1", value: 2298 },
        averageColumn2: { id: "averageColumn2", value: 1337 }
      },
      columnSumRow: ["averageColumn0", "averageColumn1", "averageColumn2"],
      rows: {
        "0": ["0-0", "0-1", "0-2"],
        "1": ["1-0", "1-1", "1-2"],
        "2": ["2-0", "2-1", "2-2"]
      },
      table: ["0", "1", "2"],
      x: 3
    });
  });

  test("should handle SET_CLOSE_VALUES 2", () => {
    store.dispatch(setCloseValue());

    expect(store.getState()).toEqual({
      cells: {
        "0-0": { amount: 614, id: "0-0" },
        "0-1": { amount: 676, id: "0-1" },
        "0-2": { amount: 335, id: "0-2" },
        "1-0": { amount: 802, id: "1-0" },
        "1-1": { amount: 703, id: "1-1" },
        "1-2": { amount: 254, id: "1-2" },
        "2-0": { amount: 982, id: "2-0" },
        "2-1": { amount: 919, id: "2-1" },
        "2-2": { amount: 748, id: "2-2" }
      },
      closeValues: {},
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 2398 },
        averageColumn1: { id: "averageColumn1", value: 2298 },
        averageColumn2: { id: "averageColumn2", value: 1337 }
      },
      columnSumRow: ["averageColumn0", "averageColumn1", "averageColumn2"],
      rows: {
        "0": ["0-0", "0-1", "0-2"],
        "1": ["1-0", "1-1", "1-2"],
        "2": ["2-0", "2-1", "2-2"]
      },
      table: ["0", "1", "2"],
      x: 3
    });
  });

  test("should handle SET_ROW_PERCENTS", () => {
    store.dispatch(setRowPercents("0"));

    expect(store.getState()).toEqual({
      cells: {
        "0-0": { amount: 614, id: "0-0" },
        "0-1": { amount: 676, id: "0-1" },
        "0-2": { amount: 335, id: "0-2" },
        "1-0": { amount: 802, id: "1-0" },
        "1-1": { amount: 703, id: "1-1" },
        "1-2": { amount: 254, id: "1-2" },
        "2-0": { amount: 982, id: "2-0" },
        "2-1": { amount: 919, id: "2-1" },
        "2-2": { amount: 748, id: "2-2" }
      },
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 2398 },
        averageColumn1: { id: "averageColumn1", value: 2298 },
        averageColumn2: { id: "averageColumn2", value: 1337 }
      },
      columnSumRow: ["averageColumn0", "averageColumn1", "averageColumn2"],
      rowPercents: { "0-0": "37.78%", "0-1": "41.6%", "0-2": "20.62%" },
      rows: {
        "0": ["0-0", "0-1", "0-2"],
        "1": ["1-0", "1-1", "1-2"],
        "2": ["2-0", "2-1", "2-2"]
      },
      table: ["0", "1", "2"],
      x: 3
    });
  });

  test("should handle SET_ROW_PERCENTS 2", () => {
    store.dispatch(setRowPercents("clean"));

    expect(store.getState()).toEqual({
      cells: {
        "0-0": { amount: 614, id: "0-0" },
        "0-1": { amount: 676, id: "0-1" },
        "0-2": { amount: 335, id: "0-2" },
        "1-0": { amount: 802, id: "1-0" },
        "1-1": { amount: 703, id: "1-1" },
        "1-2": { amount: 254, id: "1-2" },
        "2-0": { amount: 982, id: "2-0" },
        "2-1": { amount: 919, id: "2-1" },
        "2-2": { amount: 748, id: "2-2" }
      },
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 2398 },
        averageColumn1: { id: "averageColumn1", value: 2298 },
        averageColumn2: { id: "averageColumn2", value: 1337 }
      },
      columnSumRow: ["averageColumn0", "averageColumn1", "averageColumn2"],
      rowPercents: {},
      rows: {
        "0": ["0-0", "0-1", "0-2"],
        "1": ["1-0", "1-1", "1-2"],
        "2": ["2-0", "2-1", "2-2"]
      },
      table: ["0", "1", "2"],
      x: 3
    });
  });
});
