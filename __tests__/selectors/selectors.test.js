import {
  getCellAmount,
  getRowSum,
  getIsCloseValue,
  getAverageValueInColumn,
  getCellPercent
} from "../../src/redux/selectors";

import { testStore } from "../reducers/reducers.test";

describe("test selectors", () => {
  test("selector - getCellAmount", () => {
    const data = getCellAmount({ table: testStore }, { cellId: "0-1" });
    expect(data).toEqual(676);
  });

  test("selector - getRowSum", () => {
    const data = getRowSum({ table: testStore }, "0");
    expect(data).toEqual(1626);
  });

  test("selector - getTableCellAverageValueInColumn", () => {
    const data = getAverageValueInColumn(
      { table: testStore },
      "averageColumn1"
    );
    expect(data).toEqual(602.33);
  });

  test("selector - getIsCloseValue", () => {
    const data = getIsCloseValue(
      {
        table: {
          ...testStore,
          closeValues: {
            "0-0": { amount: 0, id: "0-0" },
            "0-1": { amount: 61, id: "0-1" },
            "1-1": { amount: 88, id: "1-1" },
            "2-2": { amount: 133, id: "2-2" }
          }
        }
      },
      "2-2"
    );
    expect(data).toEqual(true);
  });

  test("selector - getIsCloseValue", () => {
    const data = getIsCloseValue(
      {
        table: {
          ...testStore,
          closeValues: {
            "0-0": { amount: 0, id: "0-0" },
            "0-1": { amount: 61, id: "0-1" },
            "1-1": { amount: 88, id: "1-1" },
            "2-2": { amount: 133, id: "2-2" }
          }
        }
      },
      "2-1"
    );
    expect(data).toEqual(false);
  });

  test("selector - getCellPercent", () => {
    const data = getCellPercent(
      {
        table: {
          ...testStore,
          rowPercents: { "1-0": "45.59%", "1-1": "39.97%", "1-2": "14.44%" }
        }
      },
      "1-1"
    );
    expect(data).toEqual("39.97%");
  });
});
