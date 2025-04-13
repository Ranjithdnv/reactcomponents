// components/MotionItem.jsx
import { motion } from "framer-motion";

const MotionItem = ({
  children,
  animation = "fadeInUp",
  loop = false,
  delay = 0,
}) => {
  const transition = loop
    ? variants[animation]?.visible?.transition || {
        duration: 1,
        repeat: Infinity,
      }
    : { duration: 0.6, ease: "easeOut", delay };

  const variants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 40, x: 0 },
      visible: {
        opacity: 1,
        y: 0,
        x: 100,
        transition: { duration: 1.5, ease: "easeInOut" },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 100 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: -40 },
      visible: { opacity: 1, y: 0 },
    },

    /** Appear from top */
    slideDown: {
      hidden: { opacity: 0, y: -40 },
      visible: { opacity: 1, y: 0 },
    },

    /** Scale with fade */
    zoomIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },

    /** Rotate in */
    rotateIn: {
      hidden: { opacity: 0, rotate: -90, scale: 0.8 },
      visible: { opacity: 1, rotate: 0, scale: 1 },
    },

    /** Flip in X axis */
    flipX: {
      hidden: { opacity: 0, rotateX: -360 },
      visible: { opacity: 1, rotateX: 0 },
    },
    rotateXY180: {
      hidden: {
        opacity: 0,
        scale: 1,
        y: 0,
        rotateX: -180,
        rotateY: 180,
        transformPerspective: 1000,
      },
      visible: {
        opacity: 1,
        y: 50,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        transition: { duration: 1, ease: "easeOut" },
      },
    },
    /** Flip in Y axis */
    flipY: {
      hidden: { opacity: 0, rotateY: -180 },
      visible: { opacity: 1, rotateY: 0 },
    },

    /** Blur in effect */
    blurIn: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
    blurZoomIn: {
      hidden: { opacity: 0, scale: 0.8, filter: "blur(12px)" },
      visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 1, ease: "easeOut" },
      },
    },
    hueRotate: {
      hidden: { opacity: 0, scale: 0.8, filter: "hue-rotate(180deg)" },
      visible: {
        opacity: 1,
        scale: 1,
        filter: "hue-rotate(0deg)",
        transition: { duration: 1.5, ease: "easeInOut" },
      },
    },
    grayscaleIn: {
      hidden: { opacity: 0, filter: "grayscale(100%)" },
      visible: {
        opacity: 1,
        filter: "grayscale(0%)",
        transition: { duration: 0.8, ease: "easeInOut" },
      },
    },
    brightnessPop: {
      hidden: { opacity: 0, scale: 0.8, filter: "brightness(0.5)" },
      visible: {
        opacity: 1,
        scale: 1,
        filter: "brightness(1)",
        transition: { duration: 1, ease: "easeOut" },
      },
    },
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0 }}
        transition={transition}
        variants={variants[animation] || variants.fadeInUp}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MotionItem;
