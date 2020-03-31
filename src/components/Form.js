// @flow

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTable } from "../redux/actions/tableActions";
import type { Dispatch } from "../redux/reducers/tableReducer";

export function Form() {
  const [state, setstate] = useState({ m: 0, n: 0, x: 0 });
  const { m, n, x } = state;

  const dispatch: Dispatch = useDispatch<Dispatch>();

  const handleSubmit = (e: SyntheticEvent<HTMLButtonElement>): void => {


    setstate({ m: 0, n: 0, x: 0 });

    dispatch(setTable(m, n, x));
  };

  const handleChange = (e: SyntheticInputEvent<HTMLInputElement>): void => {
    setstate({ ...state, [e.target.name]: parseInt(e.target.value, 10) });
  };

  return (
    <div className="form">
      <label>
        M:
        <input
          data-testid="input_m"
          type="number"
          min={0}
          value={m}
          name="m"
          onChange={handleChange}
        />
      </label>

      <label>
        N:
        <input
          data-testid="input_n"
          type="number"
          min={0}
          value={n}
          name="n"
          onChange={handleChange}
        />
      </label>

      <label>
        X:
        <input
          data-testid="input_x"
          type="number"
          min={0}
          value={x}
          name="x"
          onChange={handleChange}
        />
      </label>

      <button onClick={handleSubmit}>Build table</button>
    </div>
  );
}

export default Form;
