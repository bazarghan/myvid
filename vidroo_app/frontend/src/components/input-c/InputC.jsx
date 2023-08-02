import React from "react";
import "./InputC.scss";

const InputC = ({
  children,
  underlinedInput,
  outlinedInput,
  dashedInput,
  active,
  error,
  className,
  ...otherProps
}) => {
  return (
    <div className="input-c">
      <label htmlFor="inupt-1" className="input-c__label">
        {children}
      </label>
      <input
        className={`input-c__input ${
          underlinedInput ? "input-c__input--underlined-input" : ""
        } ${outlinedInput ? "input-c__input--outlined-input" : ""} ${
          dashedInput ? "input-c__input--dashed-input" : ""
        } ${active ? "input-c__input--active" : ""} ${
          error ? "input-c__input--error" : ""
        } ${className ? className : ""}`}
        id="inupt-1"
        {...otherProps}
      />

      {error ? <p className="input-c__error-txt">{error}</p> : null}
    </div>
  );
};

export default InputC;
