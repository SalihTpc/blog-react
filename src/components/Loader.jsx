import React from "react";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

const Loader = () => {
  const myStyle = {
    textAlign: "center",
  };
  return (
    <div style={myStyle}>
      {/* <h1>Loading...</h1> */}
      <HourglassBottomIcon style={{ fontSize: 500 }} />
    </div>
  );
};

export default Loader;
