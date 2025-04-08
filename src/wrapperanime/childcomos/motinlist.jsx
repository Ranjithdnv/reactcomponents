// components/FeatureList.jsx
import React from "react";
import MotionItem from "../wrapperanime";

const features = ["Fast Delivery", "24/7 Support", "Secure Payment"];

const FeatureList = () => {
  return (
    <div className="p-4 space-y-4">
      {features.map((text, i) => (
        <MotionItem key={i} animation="slideLeft" delay={i * 0.1}>
          <div className="text-lg font-semibold text-gray-700">{text}</div>
        </MotionItem>
      ))}
    </div>
  );
};

export default FeatureList;
