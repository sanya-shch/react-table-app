// @flow

import type { Store } from "../reducers/tableReducer";
import type { Props } from "../../components/Cell";

const getCellAmount: (state: Store, props: Props) => number = (state, props) =>
  state.table.cells[props.cellId].amount;

export default getCellAmount;
