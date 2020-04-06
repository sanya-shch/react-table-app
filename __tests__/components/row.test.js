import React from "react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import Row from "../../src/components/Row";
import { testStore } from "./table.test";

const mockStore = configureMockStore();

describe("Table component", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({ table: testStore });
    component = create(
      <Provider store={store}>
        <Row rowId={"0"} />
      </Provider>
    );
  });

  test("Matches the snapshot", () => {
    expect(store.getState()).toMatchSnapshot();
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("handleClickDelete", () => {
    const instance = component.root;
    const button = instance.findByProps({ className: "delBtn" });

    button.props.onClick();

    expect(store.getActions()).toEqual([{ payload: "0", type: "DELETE_ROW" }]);
  });

  test("handleOnmouseOverSum", () => {
    const instance = component.root;
    const cell = instance.findByProps({ className: "sumCell" });

    cell.props.onMouseOver();

    expect(store.getActions()).toEqual([
      { payload: "0", type: "SET_ROW_PERCENTS" }
    ]);
  });

  test("handleOnmouseLeaveSum", () => {
    const instance = component.root;
    const cell = instance.findByProps({ className: "sumCell" });

    cell.props.onMouseOut();

    expect(store.getActions()).toEqual([
      {
        payload: "clean",
        type: "SET_ROW_PERCENTS"
      }
    ]);
  });

  test("handleOnmouseOverCell", () => {
    const instance = component.root;
    const cell = instance.findAllByProps({ className: "tableCell " })[0];

    cell.props.onMouseOver();

    expect(store.getActions()).toEqual([
      { payload: "0-0", type: "SET_CLOSE_VALUES" }
    ]);
  });

  test("handleOnmouseLeaveCell", () => {
    const instance = component.root;
    const cell = instance.findAllByProps({ className: "tableCell " })[0];

    cell.props.onMouseOut("0-0");

    expect(store.getActions()).toEqual([
      { payload: undefined, type: "SET_CLOSE_VALUES" }
    ]);
  });

  test("handleClickAddAmount", () => {
    const instance = component.root;
    const cell = instance.findAllByProps({ className: "tableCell " })[0];

    cell.props.onClick("0-0", 0);

    expect(store.getActions()).toEqual([
      {
        payload: {
          cellId: "0-0",
          cellIndex: 0
        },
        type: "ADD_AMOUNT"
      }
    ]);
  });
});
