import React, { useState } from "react";

const TailwindDemo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-10 space-y-10">
      <h1 className="text-3xl font-bold">Rare Tailwind CSS Classes Demo</h1>

      {/* Caret color */}
      <input
        type="text"
        placeholder="Caret color"
        className="border p-2 caret-red-500"
      />

      {/* Scroll margin */}
      <a href="#scroll-target" className="block text-blue-500 underline">
        Scroll to target
      </a>
      <div id="scroll-target" className="scroll-mt-20">
        <p className="bg-yellow-100 p-4">I have scroll margin!</p>
      </div>

      {/* ARIA attributes */}
      <button
        aria-expanded={isExpanded}
        className="aria-expanded:bg-green-500 p-2 border"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        Toggle Expand
      </button>
      <div
        aria-hidden={!isExpanded}
        className="aria-hidden:opacity-30 p-4 bg-blue-100"
      >
        {isExpanded ? "I’m visible!" : "I’m hidden!"}
      </div>

      {/* Content injection */}
      <div className="before:content-['⭐'] before:mr-2">
        Injected content with ::before
      </div>

      {/* Decoration clone */}
      <span className="bg-gradient-to-r from-pink-500 to-purple-500 decoration-clone p-2">
        Cloned decoration
      </span>

      {/* Motion reduce */}
      <div className="motion-reduce:animate-none animate-pulse p-4 bg-yellow-200">
        Reduced motion support (try with reduced motion settings!)
      </div>

      {/* Ping animation */}
      <div className="relative">
        <div className="animate-ping absolute h-4 w-4 bg-blue-500 rounded-full"></div>
        <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
      </div>

      {/* Backdrop blur */}
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-md bg-white/30 p-4">
          Backdrop blur
        </div>
        <div className="p-4 bg-gray-300">Content behind blur</div>
      </div>

      {/* Feature support */}
      <div className="supports-[display:grid]:grid grid-cols-2 gap-4">
        <div className="bg-green-200 p-4">Grid supported</div>
        <div className="bg-green-300 p-4">Another grid item</div>
      </div>

      {/* Line clamp */}
      <p className="line-clamp-3 bg-gray-200 p-4">
        This text is really long and will be clamped to only three lines no
        matter how much content you try to fit in. This helps prevent text from
        overflowing when you want to limit the visible content. It’s super
        useful!
      </p>
    </div>
  );
};

export default TailwindDemo;
