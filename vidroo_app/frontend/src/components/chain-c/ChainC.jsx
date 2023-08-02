import React from "react";
import "./ChainC.scss";

const ChainC = ({ className, small }) => {
  return (
    <div className={`chain-c ${className} ${small ? "chain-c--small" : ""}`}>
      <div className="chain-c__circle"></div>
      <div className="chain-c__rectangle"></div>
      <div className="chain-c__circle"></div>
    </div>
  );
};

export default ChainC;
