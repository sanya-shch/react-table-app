import React from "react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import Cell from "../../src/components/Cell";
import { testStore } from "./table.test";

const mockStore = configureMockStore();

describe("Table component", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      table: {
        ...testStore,
        closeValues: {
          "0-0": { amount: 0, id: "0-0" },
          "0-1": { amount: 61, id: "0-1" },
          "1-1": { amount: 88, id: "1-1" },
          "2-2": { amount: 133, id: "2-2" }
        },
        rowPercents: { "0-0": "37.78%", "0-1": "41.6%", "0-2": "20.62%" }
      }
    });
    component = create(
      <Provider store={store}>
        <Cell cellId={"0-0"} cellIndex={0} />
      </Provider>
    );
  });

  test("Matches the snapshot", () => {
    expect(store.getState()).toMatchSnapshot();
    expect(component.toJSON()).toMatchSnapshot();
  });
});
