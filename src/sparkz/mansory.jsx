import React from "react";
import Masonry from "react-masonry-css";
import splush from "../assets/splush.png";
import splush1 from "../assets/bird.png";
import splush2 from "../assets/airport.jpg";
// Ensure the correct path

const images = [
  splush1,
  splush2,
  splush,
  splush1,
  splush2,
  splush1,
  splush2,
  splush,
];

const MasonryGrid = () => {
  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex gap-4"
      columnClassName="masonry-column"
    >
      {images.map((src, index) => (
        <div key={index} className="w-full mb-4">
          <img
            src={src}
            className="w-full h-auto rounded-lg object-cover"
            alt={`Masonry Item ${index + 1}`}
          />
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
