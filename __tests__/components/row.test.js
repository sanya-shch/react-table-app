import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Row from "../../src/components/Row";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../src/redux/reducers/tableReducer";

export const testStore = {
  cells: {
    "0-0": { amount: 614, id: "0-0" },
    "0-1": { amount: 676, id: "0-1" },
    "0-2": { amount: 335, id: "0-2" }
  },
  closeValues: {},
  columnSum: {
    averageColumn0: { id: "averageColumn0", value: 614 },
    averageColumn1: { id: "averageColumn1", value: 676 },
    averageColumn2: { id: "averageColumn2", value: 335 }
  },
  columnSumRow: ["averageColumn0", "averageColumn1", "averageColumn2"],
  rowPercents: {},
  rows: {
    "0": ["0-0", "0-1", "0-2"]
  },
  table: ["0"],
  x: 0
};

describe("the Row component", () => {
  const store = makeTestStore();

  it("row component - toMatchSnapshot", () => {
    const { container } = render(
      <Provider store={store}>
        {
          <table>
            <tbody>
              <Row rowId={"0"} />
            </tbody>
          </table>
        }
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("row component - mouseOver sum", () => {
    const { getByText } = render(
      <Provider store={store}>
        {
          <table>
            <tbody>
              <Row rowId={"0"} />
            </tbody>
          </table>
        }
      </Provider>
    );

    fireEvent.mouseOver(getByText("1625"));

    expect(store.dispatch).toHaveBeenCalledWith({
      payload: "0",
      type: "SET_ROW_PERCENTS"
    });
  });

  it("row component - mouseLeave sum", () => {
    const { getByText } = render(
      <Provider store={store}>
        {
          <table>
            <tbody>
              <Row rowId={"0"} />
            </tbody>
          </table>
        }
      </Provider>
    );

    fireEvent.mouseLeave(getByText("1625"));

    expect(store.dispatch).toHaveBeenCalledWith({
      payload: "clean",
      type: "SET_ROW_PERCENTS"
    });
  });

  it("row component - mouseOver cell", () => {
    const { getByText } = render(
      <Provider store={store}>
        {
          <table>
            <tbody>
              <Row rowId={"0"} />
            </tbody>
          </table>
        }
      </Provider>
    );

    fireEvent.mouseOver(getByText("335"));

    expect(store.dispatch).toHaveBeenCalledWith({
      payload: "0-2",
      type: "SET_CLOSE_VALUES"
    });
  });

  it("row component - mouseLeave cell", () => {
    const { getByText } = render(
      <Provider store={store}>
        {
          <table>
            <tbody>
              <Row rowId={"0"} />
            </tbody>
          </table>
        }
      </Provider>
    );

    fireEvent.mouseLeave(getByText("335"));

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "SET_CLOSE_VALUES"
    });
  });

  it("row component - click on cell", () => {
    const { getByText } = render(
      <Provider store={store}>
        {
          <table>
            <tbody>
              <Row rowId={"0"} />
            </tbody>
          </table>
        }
      </Provider>
    );

    fireEvent.click(getByText("335"));

    expect(store.dispatch).toHaveBeenCalledWith({
      payload: {
        cellId: "0-2",
        cellIndex: 2
      },
      type: "ADD_AMOUNT"
    });

    expect(store.dispatch).toMatchSnapshot();
  });
});

function makeTestStore() {
  const store = createStore(reducers, { table: testStore });
  store.dispatch = jest.fn();
  return store;
}
