import React from "react";
import "./PopUpC.scss";

const PopUpC = ({ children, className }) => {
  return (
    <div className="pop-up-c">
      <div className={`pop-up-c__container-1 ${className}`}>{children}</div>
    </div>
  );
};

export default PopUpC;
