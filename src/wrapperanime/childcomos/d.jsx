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

const Card61 = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="relative w-[240px] h-[400px] rounded-2xl overflow-hidden shadow-xl bg-transparent">
        {/* Waves - faster rotation */}
        <motion.div
          className="absolute w-[540px] h-[700px] left-0 top-0 -ml-[50%] -mt-[70%] opacity-60 rounded-[40%] bg-gradient-to-tr from-[#af40ff] via-[#5b42f3] to-[#00ddeb]"
          variants={waveVariant(10)}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute w-[540px] h-[700px] left-0 top-[210px] -ml-[50%] -mt-[70%] opacity-60 rounded-[40%] bg-gradient-to-tr from-[#af40ff] via-[#5b42f3] to-[#00ddeb]"
          variants={waveVariant(8)}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute w-[540px] h-[700px] left-0 top-[210px] -ml-[50%] -mt-[70%] opacity-60 rounded-[40%] bg-gradient-to-tr from-[#af40ff] via-[#5b42f3] to-[#00ddeb]"
          variants={waveVariant(6)}
          initial="initial"
          animate="animate"
        />

        {/* Info */}
        <div className="relative z-10 p-6 text-center text-white font-semibold mt-24">
          <p className="text-base">
            Ranjith mokaRanjith moknjith mokaRanjith moknjith mokaRanjith moka
          </p>
          <p className="mt-2">Ranjith moka</p>
          <p className="text-sm mt-2">UI / EX Designer</p>
          <div className="text-xs font-light mt-3 lowercase">
            MikeAndrewDesigner
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card61;
