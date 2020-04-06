// @flow

import type { Store } from "../reducers/tableReducer";
import type { Props } from "../../components/Cell";

const getCellPercent: (state: Store, props: Props) => string = (state, props) =>
  state.table.rowPercents[props.cellId];

export default getCellPercent;
