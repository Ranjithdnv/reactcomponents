import React, { useState } from "react";

const Grid = () => {
  const [activeBox, setActiveBox] = useState(null);

  return (
    <div>
      {" "}
      <div
        className="grid grid-cols-2  items-start gap-4 p-4 bg-red-200"
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
              activeBox === index ? "row-span-6 h-[100%] " : "row-span-1"
            }`}
            onClick={() => setActiveBox(index)}
          >
            {box}
          </div>
        ))}
      </div>
      all grids techniques
      <div>
        <div
          className=""
          style={{
            display: "grid",
            rowGap: "clamp(4rem, 1vh, 3rem)",
            columnGap: "clamp(1rem, 1vw, 4rem)",

            gridTemplateColumns:
              "minmax(100px, 7fr) 2fr 100px 1fr minmax(150px, 3fr)",
            // gap: "clamp(0.5rem, 1vw, 4rem)",
          }}
        >
          {[
            "Box 1",
            "Box 2",
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
              style={{
                backgroundColor: "#bfdbfe", // Tailwind's bg-blue-200
                padding: "1rem",
                borderRadius: "0.5rem",
                //textAlign: "center",
              }}
            >
              {box}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "[start] 1fr [center] 2fr [center] 100px [end] 1fr",
            gap: "1rem", // Optional
            paddingBlock: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#fca5a5", // Tailwind's red-300
              padding: "1rem",
              borderRadius: "0.5rem",
              textAlign: "center",
            }}
          >
            Left
          </div>

          <div
            style={{
              backgroundColor: "#93c5fd", // Tailwind's blue-300
              padding: "1rem",
              borderRadius: "0.5rem",
              textAlign: "center",
            }}
          >
            Center (100px)
          </div>
          <div
            style={{
              backgroundColor: "#93c5fd", // Tailwind's blue-300
              padding: "1rem",
              borderRadius: "0.5rem",
              textAlign: "center",
            }}
          >
            Center (100px)
          </div>

          <div
            style={{
              backgroundColor: "#86efac", // Tailwind's green-300
              padding: "1rem",
              borderRadius: "0.5rem",
              textAlign: "center",
            }}
          >
            Right
          </div>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gridAutoRows: "minmax(100px, auto)",
          justifyItems: "center",
          alignItems: "start",
          gap: "1.5rem",
          padding: "2rem",
        }}
      >
        {[
          "Box 1",
          "Box 2",
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
            style={{
              backgroundColor: "#bfdbfe", // Tailwind's bg-blue-200
              padding: "1rem",
              borderRadius: "0.5rem",
              textAlign: "center",
              width: "100%", // Ensures the item fills its column
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {box}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "200px",
          gap: "1rem",
          padding: "2rem",
        }}
      >
        <div
          style={{
            gridArea: "1 / 1 / 2 / 3", // spans column 1 and 2
            backgroundColor: "#93c5fd", // blue-300
            padding: "1rem",
            borderRadius: "0.5rem",
            zIndex: 1,
          }}
        >
          Item 1 (Below)
        </div>

        <div
          style={{
            gridArea: "1 / 2 / 2 / 4", // spans column 2 and 3, overlaps col 2
            backgroundColor: "#fca5a5", // red-300
            padding: "1rem",
            margin: "rem",
            borderRadius: "0.5rem",
            zIndex: 2,
            position: "relative", // Needed for zIndex to take effect
          }}
        >
          Item 2 (Above)
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-[200px] gap-4 p-8">
        <div className="col-start-1 col-end-3 row-start-1 row-end-2 bg-blue-300 p-4 rounded z-[1]">
          Item 1 (Below)
        </div>

        <div className="col-start-2 col-end-4 row-start-1 row-end-3 bg-red-300 p-4 m-4 rounded z-[2] relative">
          Item 2 (Above)
        </div>
      </div>
    </div>
  );
};

export default Grid;
