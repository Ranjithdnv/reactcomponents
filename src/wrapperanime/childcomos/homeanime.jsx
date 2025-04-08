import React from "react";
import MotionItem from "../wrapperanime";
import TeamSection from "./teamsection";
import FeatureList from "./motinlist";

const MarqueeText = () => {
  const text = "Your Trusted Global Partner • Reliable • Fast • Transparent";

  return (
    <div className="  max-w-[100vw] overflow-hidden">
      <MotionItem animation="fadeIn">
        <div className="relative overflow-hidden bg-black py-6 whitespace-nowrap">
          <div className="inline-block animate-marquee text-white text-2xl font-semibold">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="mr-16 inline-block">
                {text}
              </span>
            ))}
          </div>
        </div>
        <TeamSection />
        <FeatureList />
        {/* Local CSS for marquee animation */}
        <style>{`
      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-100%); }
      }

      .animate-marquee {
        animation: marquee 20s linear infinite;
      }
    `}</style>
      </MotionItem>
    </div>
  );
};

export default MarqueeText;
