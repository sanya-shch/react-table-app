import React from "react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { create, act } from "react-test-renderer";
import Form from "../../src/components/Form";

const mockStore = configureMockStore();

describe("Table component", () => {
  let store = mockStore({});
  let component = create(
    <Provider store={store}>
      <Form />
    </Provider>
  );

  test("Matches the snapshot", () => {
    expect(store.getState()).toMatchSnapshot();
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("handleChange", () => {
    const instance = component.root;
    const input = instance.findByProps({ "data-testid": "input_m" });

    act(() => input.props.onChange({ target: { value: 5, name: "m" } }));

    expect(input.props.value).toEqual(5);
  });

  test("handleSubmit", () => {
    const instance = component.root;
    const button = instance.findByType("button");

    act(() => button.props.onClick());

    expect(store.getActions()).toEqual([
      {
        payload: {
          m: 5,
          n: 0,
          x: 0
        },
        type: "SET_TABLE"
      }
    ]);
  });
});
