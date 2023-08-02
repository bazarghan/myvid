import React from "react";
import "./InputFileC.scss";

// This way, components using "InputFileC" component can get a ref to the underlying input DOM node
// and access it if necessary just like if they used a DOM input directly.
const InputFileC = React.forwardRef(
  ({ children, svg, className, ...otherProps }, ref) => {
    return (
      <div className="input-file-c">
        <label
          htmlFor="input-file-c__label"
          className={`input-file-c__label ${className}`}
        >
          {children}
          {svg}

          <input
            id="input-file-c__label"
            type="file"
            className="input-file-c__input"
            ref={ref}
            {...otherProps}
          />
        </label>
      </div>
    );
  }
);

export default InputFileC;