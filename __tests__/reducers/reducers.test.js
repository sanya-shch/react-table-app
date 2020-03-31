import { mockRandom, resetMockRandom } from "jest-mock-random";
import tableReducer from "../../src/redux/reducers/tableReducer";
import { initialState } from "../../src/redux/reducers/tableReducer";
import * as types from "../../src/redux/actions/types";

export const testStore = {
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
  rowPercents: {},
  rows: {
    "0": ["0-0", "0-1", "0-2"],
    "1": ["1-0", "1-1", "1-2"],
    "2": ["2-0", "2-1", "2-2"]
  },
  table: ["0", "1", "2"],
  x: 3
};

describe("test table reducer", () => {
  test("should return the initial state", () => {
    expect(tableReducer(undefined, {})).toEqual({
      table: [],
      rows: {},
      cells: {},
      columnSumRow: [],
      columnSum: {},
      closeValues: {},
      rowPercents: {},
      x: 0
    });
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

    expect(
      tableReducer(initialState, {
        type: types.SET_TABLE,
        payload: { m: 3, n: 3, x: 3 }
      })
    ).toEqual({
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
      rowPercents: {},
      rows: {
        "0": ["0-0", "0-1", "0-2"],
        "1": ["1-0", "1-1", "1-2"],
        "2": ["2-0", "2-1", "2-2"]
      },
      table: ["0", "1", "2"],
      x: 3
    });

    resetMockRandom();
  });

  test("should handle ADD_ROW", () => {
    mockRandom([0.7539901, 0.1248502, 0.3596403]);

    expect(
      tableReducer(testStore, {
        type: types.ADD_ROW
      })
    ).toEqual({
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
      closeValues: {},
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 3176 },
        averageColumn1: { id: "averageColumn1", value: 2510 },
        averageColumn2: { id: "averageColumn2", value: 1760 }
      },
      columnSumRow: ["averageColumn0", "averageColumn1", "averageColumn2"],
      rowPercents: {},
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
    expect(
      tableReducer(testStore, {
        type: types.DELETE_ROW,
        payload: "1"
      })
    ).toEqual({
      cells: {
        "0-0": { amount: 614, id: "0-0" },
        "0-1": { amount: 676, id: "0-1" },
        "0-2": { amount: 335, id: "0-2" },
        "2-0": { amount: 982, id: "2-0" },
        "2-1": { amount: 919, id: "2-1" },
        "2-2": { amount: 748, id: "2-2" }
      },
      closeValues: {},
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 2374 },
        averageColumn1: { id: "averageColumn1", value: 1807 },
        averageColumn2: { id: "averageColumn2", value: 1506 }
      },
      columnSumRow: ["averageColumn0", "averageColumn1", "averageColumn2"],
      rowPercents: {},
      rows: { "0": ["0-0", "0-1", "0-2"], "2": ["2-0", "2-1", "2-2"] },
      table: ["0", "2"],
      x: 3
    });
  });

  test("should handle ADD_AMOUNT", () => {
    expect(
      tableReducer(testStore, {
        type: types.ADD_AMOUNT,
        payload: { cellId: "0-0", cellIndex: 0 }
      })
    ).toEqual({
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
      closeValues: {},
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 2375 },
        averageColumn1: { id: "averageColumn1", value: 1807 },
        averageColumn2: { id: "averageColumn2", value: 1506 }
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

  test("should handle SET_CLOSE_VALUES", () => {
    expect(
      tableReducer(testStore, {
        type: types.SET_CLOSE_VALUES,
        payload: "0-0"
      })
    ).toEqual({
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
      closeValues: {
        "0-0": { amount: 0, id: "0-0" },
        "0-1": { amount: 61, id: "0-1" },
        "1-1": { amount: 88, id: "1-1" },
        "2-2": { amount: 133, id: "2-2" }
      },
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 2375 },
        averageColumn1: { id: "averageColumn1", value: 1807 },
        averageColumn2: { id: "averageColumn2", value: 1506 }
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

  test("should handle SET_CLOSE_VALUES 2", () => {
    expect(
      tableReducer(testStore, {
        type: types.SET_CLOSE_VALUES,
        payload: null
      })
    ).toEqual({
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
      closeValues: {},
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 2375 },
        averageColumn1: { id: "averageColumn1", value: 1807 },
        averageColumn2: { id: "averageColumn2", value: 1506 }
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

  test("should handle SET_ROW_PERCENTS", () => {
    expect(
      tableReducer(testStore, {
        type: types.SET_ROW_PERCENTS,
        payload: "1"
      })
    ).toEqual({
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
      closeValues: {},
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 2375 },
        averageColumn1: { id: "averageColumn1", value: 1807 },
        averageColumn2: { id: "averageColumn2", value: 1506 }
      },
      columnSumRow: ["averageColumn0", "averageColumn1", "averageColumn2"],
      rowPercents: { "1-0": "45.59%", "1-1": "39.97%", "1-2": "14.44%" },
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
    expect(
      tableReducer(testStore, {
        type: types.SET_ROW_PERCENTS,
        payload: "clean"
      })
    ).toEqual({
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
      closeValues: {},
      columnSum: {
        averageColumn0: { id: "averageColumn0", value: 2375 },
        averageColumn1: { id: "averageColumn1", value: 1807 },
        averageColumn2: { id: "averageColumn2", value: 1506 }
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
