// @flow

import type { Store } from "../reducers/tableReducer";
import type { Props } from "../../components/Cell";

const getIsCloseValue: (state: Store, props: Props) => boolean = (
  state,
  props
) => Boolean(state.table.closeValues[props.cellId]);

export default getIsCloseValue;
