import React from "react";
import { motion } from "framer-motion";

const waveVariant = (duration) => ({
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      ease: "linear",
      duration,
    },
  },
  initial: {
    rotate: 0,
  },
});

const WaveLayer = ({ duration, className = "" }) => (
  <motion.div
    className={`absolute w-[540px] h-[700px] opacity-60 rounded-[40%] bg-gradient-to-tr from-[#af40ff] via-[#5b42f3] to-[#00ddeb] ${className}`}
    variants={waveVariant(duration)}
    initial="initial"
    animate="animate"
  />
);

const AnimatedWavesCard = ({
  name = "Ranjith moka",
  role = "UI / EX Designer",
  description = "Creative visual expert with a passion for smooth UI.",
  waveSpeeds = [10, 8, 6],
}) => {
  return (
    <div className="flex justify-center items-center !w-fit   rounded-2xl    bg-blue-400">
      <div className="relative w-[400px] h-[400px] rounded-2xl bg-blue-300 overflow-hidden shadow-xl bg-transparent">
        {/* Waves */}
        <WaveLayer
          duration={waveSpeeds[0]}
          className="left-0 top-0 -ml-[50%] -mt-[70%]"
        />
        <WaveLayer
          duration={waveSpeeds[1]}
          className="left-0 top-[210px] -ml-[50%] -mt-[70%]"
        />
        <WaveLayer
          duration={waveSpeeds[2]}
          className="left-0 top-[210px] -ml-[50%] -mt-[70%]"
        />

        {/* Info */}
        <div className="relative z-10 p-6 text-center  text-white font-semibold mt-24">
          <p className="text-base">{description}</p>
          <p className="mt-2">{name}</p>
          <p className="text-sm mt-2">{role}</p>
          <div className="text-xs font-light mt-3 lowercase">
            MikeAndrewDesigner
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedWavesCard;
