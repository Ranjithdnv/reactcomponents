import React, { useState } from "react";

const Grid = () => {
  const [activeBox, setActiveBox] = useState(null);

  return (
    <div
      className="grid grid-cols-2 items-center gap-4 p-4 bg-red-200"
      style={{
        gridAutoRows: "minmax(30px, 1fr)", // Dynamic row sizing
      }}
    >
      {[
        "Box 1",
        "Box 2",
        "Box 3",
        "Box 4",
        "Box 5",
        "Box 6",
        "Box 3",
        "Box 4",
        "Box 5",
        "Box 6",
        "Box 3",
        "Box 4",
        "Box 5",
        "Box 6",
        "Box 7",
        "Box 8",
        "Box 9",
        "Box 10",
      ].map((box, index) => (
        <div
          key={index}
          className={`bg-blue-500 text-white p-4 rounded-lg shadow-lg text-center transition-all duration-300 cursor-pointer ${
            activeBox === index ? "row-span-6 h-[80%]" : "row-span-1"
          }`}
          onClick={() => setActiveBox(index)}
        >
          {box}
        </div>
      ))}
    </div>
  );
};

export default Grid;
