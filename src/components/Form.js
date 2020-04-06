// @flow

import React, { useState } from "react";

export function Form() {
  const [state, setstate] = useState({ m: 0, n: 0, x: 0 });
  const { m, n, x } = state;

  const handleSubmit = () => {
    window.history.pushState(state, "Table", "http://localhost:3000/");
  };

  const handleChange = (e: SyntheticInputEvent<HTMLInputElement>): void => {
    setstate({ ...state, [e.target.name]: parseInt(e.target.value, 10) });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
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

      <button>Build table</button>
    </form>
  );
}

export default Form;
