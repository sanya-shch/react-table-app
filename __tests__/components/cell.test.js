import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Cell from "../../src/components/Cell";
import {
  getIsCloseValue,
  getCellPercent,
  getCellAmount
} from "../../src/redux/selectors";
import reducers from "../../src/redux/reducers/tableReducer";
import { testStore } from "../reducers/reducers.test";

jest.mock("../../src/redux/selectors", () => ({
  getIsCloseValue: jest.fn(),
  getCellPercent: jest.fn(),
  getCellAmount: jest.fn()
}));

describe("the Cell component", () => {
  const store = createStore(reducers, { table: testStore });

  it("cell component - toMatchSnapshot 1", () => {
    getCellAmount.mockReturnValue(335);
    getIsCloseValue.mockReturnValue(false);
    getCellPercent.mockReturnValue(undefined);

    const { container } = render(
      <Provider store={store}>
        {
          <table>
            <tbody>
              <tr>
                <Cell
                  cellIndex={1}
                  cellId={"0-2"} /*onclick onmouseover  onmouseout*/
                />
              </tr>
            </tbody>
          </table>
        }
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("cell component - toMatchSnapshot 2", () => {
    getCellAmount.mockReturnValue(335);
    getIsCloseValue.mockReturnValue(true);

    const { container } = render(
      <Provider store={store}>
        {
          <table>
            <tbody>
              <tr>
                <Cell cellIndex={1} cellId={"0-2"} />
              </tr>
            </tbody>
          </table>
        }
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("cell component - toMatchSnapshot 3", () => {
    getCellAmount.mockReturnValue(335);
    getIsCloseValue.mockReturnValue(false);
    getCellPercent.mockReturnValue("10%");

    const { container } = render(
      <Provider store={store}>
        {
          <table>
            <tbody>
              <tr>
                <Cell cellIndex={1} cellId={"0-2"} />
              </tr>
            </tbody>
          </table>
        }
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
