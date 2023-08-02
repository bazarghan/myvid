import React from "react";
import "./AnnounceC.scss";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const AnnounceC = ({ children, slider, className }) => {
  return (
    <div
      className={`announce-c ${
        slider ? "announce-c--slider" : ""
      } ${className}`}
    >
      {slider ? <ArrowForwardIosIcon /> : null}
      <div className="announce-c__txt">{children}</div>
      {slider ? <ArrowBackIosIcon /> : null}
    </div>
  );
};

export default AnnounceC;
