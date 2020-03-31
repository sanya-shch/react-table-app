import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Table from "../../src/components/Table";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../src/redux/reducers/tableReducer";
import { testStore } from "../reducers/reducers.test";

describe("the Table component", () => {
  it("table", () => {
    const store = makeTestStore();

    const { getByText, getAllByText, container } = testRender(<Table />, {
      store
    });

    expect(container).toMatchSnapshot();

    expect(getAllByText("Delete").length).toEqual(3);

    expect(getByText("Add").className).toEqual("addBtn");

    fireEvent.click(getByText("Add"));

    expect(store.dispatch).toBeCalled();

    expect(store.dispatch).toMatchSnapshot();
    expect(store.dispatch).toHaveBeenCalledWith({ type: "ADD_ROW" }); //.toBe();

    //

    fireEvent.click(getAllByText("Delete")[0]);
    expect(store.dispatch).toHaveBeenCalledWith({
      payload: "0",
      type: "DELETE_ROW"
    });
    expect(store.dispatch).toMatchSnapshot();

  });
});

const TestProvider = ({ store, children }) => (
  <Provider store={store}>{children}</Provider>
);

function testRender(ui, { store, ...otherOpts }) {
  return render(<TestProvider store={store}>{ui}</TestProvider>, otherOpts);
}

function makeTestStore() {
  const store = createStore(reducers, { table: testStore });

  store.dispatch = jest.fn();
  return store;
}

