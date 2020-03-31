import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { render, fireEvent } from "@testing-library/react";
import Form from "../../src/components/Form";
import reducers from "../../src/redux/reducers/tableReducer";

describe("the Table component", () => {
  it("Form", () => {
    const store = makeTestStore();

    const { getByText, getByLabelText, getByTestId, container } = render(
      <Provider store={store}>{<Form />}</Provider>
    );

    expect(container).toMatchSnapshot();

    expect(getByLabelText("M:").value).toEqual("0");

    expect(getByLabelText("N:").value).toEqual("0");

    expect(getByLabelText("X:").value).toEqual("0");

    fireEvent.change(getByTestId("input_m"), { target: { value: "1000" } });
    expect(
      getByLabelText("M:", {
        selector: "input"
      }).value
    ).toBe("1000");

    fireEvent.change(getByTestId("input_n"), { target: { value: "10" } });
    expect(
      getByLabelText("N:", {
        selector: "input"
      }).value
    ).toBe("10");

    fireEvent.change(getByTestId("input_x"), { target: { value: "30" } });
    expect(
      getByLabelText("X:", {
        selector: "input"
      }).value
    ).toBe("30");

    fireEvent.click(getByText("Build table"));
    expect(store.dispatch).toHaveBeenCalledWith({
      payload: { m: 1000, n: 10, x: 30 },
      type: "SET_TABLE"
    });
  });
});

function makeTestStore() {
  const store = createStore(reducers, {});
  store.dispatch = jest.fn();
  return store;
}
