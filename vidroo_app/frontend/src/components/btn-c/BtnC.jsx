import React from "react";
import "./BtnC.scss";

const BtnC = ({
  children,
  primary,
  secondary,
  disabled,
  large,
  small,
  exSmall,
  className,
  ...otherProps
}) => {
  return (
    <button
      className={`btn-c ${primary ? "btn-c--primary" : ""} ${
        secondary ? "btn-c--secondary" : ""
      } ${disabled ? "btn-c--disabled" : ""} ${large ? "btn-c--large" : ""} ${
        small ? "btn-c--small" : ""
      } ${exSmall ? "btn-c--ex-small" : ""} ${className ? className : ""}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default BtnC;
