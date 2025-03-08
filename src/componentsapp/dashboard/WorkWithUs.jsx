import React from "react";
import backgroundSvg from "../../assets/images/WorkwithusBG.svg";

const WorkWithUs = () => (
  <div className="relative p-4 shadow-lg rounded-lg bg-transparent overflow-hidden flex">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${backgroundSvg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // opacity: 0.1, // Adjust opacity as needed
      }}
    ></div>
    <div className="relative z-10">
      <h2 className="text-xl text-white font-bold mb-4 text-left">
        Work with the Rockets
      </h2>
      <p className="mb-4 text-left text-white ">
        Wealth creation is an evolutionarily recent positive-sum game. It is all
        about who take the opportunity first.
      </p>
      <p className="text-white !text-left">Read more</p>
    </div>
  </div>
);

export default WorkWithUs;
