import { motion } from "framer-motion";
import { span } from "framer-motion/client";
import { useState, useRef } from "react";

export default function AnimatedParent({ anime = "bounce" }) {
  const animations = {
    bounce: <BouncingText text="Hello World" />,
    magnetic: <MagneticCard />,
    flip: <RandomFlipCard />,
    shake: <ShakeCard />,
    neon: <NeonGlowCard />,
    stack: <StackedCards />,
    tilt: <TiltCard />,
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      {animations[anime] || null}
    </div>
  );
}
function TiltCard() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20; // Invert y for natural effect

    setRotate({ x, y });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      className="w-64 h-80 bg-blue-500 text-white rounded-lg flex items-center justify-center text-xl font-bold shadow-lg"
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      Tilt Me
    </motion.div>
  );
}

function StackedCards() {
  const [cards, setCards] = useState(["Card 1", "Card 2", "Card 3"]);

  const removeCard = () => {
    setCards((prev) => prev.slice(1)); // Remove the top card
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      {cards.map((card, index) => (
        <motion.div
          key={card}
          className="absolute w-64 h-80 bg-blue-500 text-white rounded-lg flex items-center justify-center shadow-lg"
          style={{ top: index * 10, zIndex: cards.length - index }}
          animate={{ y: -index * 5 }}
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 100) removeCard();
          }}
        >
          {card}
        </motion.div>
      ))}
    </div>
  );
}

function NeonGlowCard() {
  return (
    <motion.div
      className="w-64 h-80 bg-gray-900 text-white rounded-lg flex items-center justify-center text-xl font-bold shadow-lg relative"
      animate={{
        boxShadow: [
          "0px 0px 10px rgba(0, 255, 255, 0.8)",
          "0px 0px 20px rgba(0, 255, 255, 1)",
          "0px 0px 10px rgba(0, 255, 255, 0.8)",
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      Neon Glow
    </motion.div>
  );
}
// Bouncing Text Component
function BouncingText({ text }) {
  return (
    <div className="flex space-x-1 text-4xl font-bold">
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: [0, -20, 0], opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: "easeOut",
            times: [0, 0.7, 1],
          }}
        >
          {letter === " " ? (
            "\u00A0"
          ) : (
            <span className=" text-orange-600">{letter}</span>
          )}
        </motion.span>
      ))}
    </div>
  );
}

// Magnetic Card Component
function MagneticCard() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      className="w-64 h-80 bg-red-500 text-white rounded-lg flex items-center justify-center text-xl font-bold shadow-lg"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 30 }}
      onMouseMove={(e) =>
        setPosition({
          x: (e.clientX - window.innerWidth / 2) / 10,
          y: (e.clientY - window.innerHeight / 2) / 10,
        })
      }
    >
      Magnetic Card
    </motion.div>
  );
}

function RandomFlipCard({ axis = "y", flipOn = "hover" }) {
  const [flipped, setFlipped] = useState(false);
  const flipAxis = axis === "x" ? "rotateX" : "rotateY"; // Choose rotation axis

  return (
    <div
      className="w-64 h-80 cursor-pointer"
      style={{ perspective: "1000px" }} // Apply perspective here
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => {
        if (flipOn === "hover") {
          setFlipped(true);
        }
      }}
      onMouseLeave={() => {
        if (flipOn === "hover") {
          setFlipped(false);
        }
      }}
    >
      <div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }} // Apply 3D transform here
      >
        {/* Front Side */}
        <motion.div
          className="absolute w-full h-full bg-blue-700 text-white rounded-lg flex items-center justify-center text-xl font-bold shadow-lg"
          animate={{ [flipAxis]: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            backfaceVisibility: "hidden",
            transformOrigin: "center",
          }}
        >
          Front Side
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute w-full h-full bg-gray-800 text-white rounded-lg flex items-center justify-center text-xl font-bold shadow-lg"
          animate={{ [flipAxis]: flipped ? 0 : -180 }}
          transition={{ duration: 0.6 }}
          style={{
            backfaceVisibility: "hidden",
            transformOrigin: "center",
            transform: `${flipAxis}(180deg)`,
          }}
        >
          Back Side
        </motion.div>
      </div>
    </div>
  );
}

// Shake Card Component
function ShakeCard() {
  return (
    <motion.div
      className="w-64 h-80 bg-yellow-500 text-white rounded-lg flex items-center justify-center text-xl font-bold shadow-lg"
      whileHover={{ x: [-5, 5, -5, 5, 0] }}
      transition={{ duration: 0.5 }}
    >
      Shake Me
    </motion.div>
  );
}
