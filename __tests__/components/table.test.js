import React from "react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import Table from "../../src/components/Table";

const mockStore = configureMockStore();

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

describe("Table component", () => {
  let store = mockStore(() => ({ table: testStore }));

  let component = create(
    <Provider store={store}>
      <Table />
    </Provider>
  );

  test("Matches the snapshot", () => {
    expect(store.getState()).toMatchSnapshot();
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("handleClickAdd", () => {
    const instance = component.root;
    const button = instance.findByProps({ className: "addBtn" });

    button.props.onClick();

    expect(store.getActions()).toEqual([{ type: "ADD_ROW" }]);
  });
});
