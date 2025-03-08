import React from "react";
import "./index.css";
const ButtonLighting = () => {
  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center">
      <div className="-z-10 absolute inset-0 bg-black"></div>

      <button className="button z-20 text-red-500">
        <span className="z-50">button</span>
      </button>
    </div>
  );
};

export default ButtonLighting;
