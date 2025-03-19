import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import {
  FaPassport,
  FaBook,
  FaPlane,
  FaHome,
  FaCheckCircle,
} from "react-icons/fa";

const AnimatedDashedProgress = () => {
  const [progress, setProgress] = useState(0); // Start at 0%
  const stepMarks = [0, 25, 50, 75, 100]; // Step positions

  const animatedProps = useSpring({
    width: `${progress}%`, // Animates progress bar width
    config: { tension: 170, friction: 20 },
  });

  const planeProps = useSpring({
    left: `${progress}%`, // Moves airplane along the progress bar
    config: { tension: 150, friction: 15 },
  });

  const increaseProgress = () => {
    setProgress((prev) => (prev >= 100 ? 0 : prev + 25)); // Cycle progress
  };

  // Icons for each step, dynamically changing color based on progress
  const getIconColor = (index) =>
    progress >= stepMarks[index] ? "orange" : "green";

  const stepIcons = [
    <FaPassport size={70} color={getIconColor(0)} />, // Visa Processing
    <FaBook size={70} color={getIconColor(1)} />, // Student Application
    <FaPlane size={70} color={getIconColor(2)} />, // Flight Ticket
    <FaHome size={70} color={getIconColor(3)} />, // Arrival
    <FaCheckCircle size={70} color={getIconColor(4)} />, // Approved
  ];

  return (
    <div className="w-[90vw] max-w-4xl mx-auto p-8 space-y-8">
      {/* Progress Bar with Icons */}
      <div className="relative w-full h-12 mt-8 ">
        {/* Dashed Progress Bar */}
        <animated.div
          style={{
            ...animatedProps,
            height: "2px",
            backgroundImage:
              "repeating-linear-gradient(90deg, #FFD700 0px, #FFD700 10px, transparent 10px, transparent 20px)", // Yellow dashes
            borderRadius: "999px",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />

        {/* Moving Airplane (Ensured it stays on top) */}
        <animated.div
          style={{
            ...planeProps,
            position: "absolute",
            top: "10px",
            transform: "translateX(-50%)",
            zIndex: 50,
          }}
        >
          <div className=" pl-32">
            {" "}
            <FaPlane size={30} color="yellow" />
          </div>
        </animated.div>

        {/* Icons that change color dynamically */}
        {stepMarks.map((mark, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              left: `${mark}%`,
              top: "-10px",
              transform: "translateX(-50%)",
              zIndex: 40, // Ensures icons stay below the airplane
            }}
          >
            {stepIcons[index]}
          </div>
        ))}
      </div>

      {/* Button to Increase Progress */}
      <button
        onClick={increaseProgress}
        className="px-6 py-3 bg-yellow-500 text-white rounded-full  hover:bg-yellow-600 transition transform hover:scale-105"
      >
        Next Step
      </button>
    </div>
  );
};

export default AnimatedDashedProgress;
