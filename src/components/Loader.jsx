import React from "react";
import { Triangle } from "react-loader-spinner";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="container">
        <Triangle color="#1976D2" height="400" width="440" />
      </div>
    </div>
  );
};

export default Loader;
