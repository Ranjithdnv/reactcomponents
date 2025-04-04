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
    <div>
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
      <div className=" flex !gap-0 bg-red-500">
        <div className=" flex   bg-pink-500 flex-grow overflow-hidden  !rounded-3xl      ">
          {" "}
          <div className="flex flex-col  justify-center h-full ">
            {" "}
            <div className=" flex flex-col justify-center    shrink-0  !flex-grow  bg-blue-500">
              cardcardcard
            </div>
            <div> card2</div>
          </div>
        </div>
        <div className="    flex flex-grow  ">
          {" "}
          <div className=" w-full bg-blue-200  ">f</div>
        </div>
      </div>
      <div className="flex">
        <div
          className="bg-red-500 p-4 shrink-0  text-white"
          style={{ flexGrow: 1, flexBasis: "300px" }} // flex-basis added
        >
          This div will grow
        </div>
        <div
          className="bg-blue-500 p-4 text-white"
          style={{ flexGrow: 3, flexBasis: "500px" }} // flex-grow remains
        >
          This div will grow twice as much
        </div>{" "}
        {/* <div
          className="bg-blue-500 p-4 shrink-0 text-white"
          style={{ flexGrow: 3, flexBasis: "400px" }} // flex-grow remains
        >
          This div will grow twice as much
        </div> */}
      </div>
    </div>
  );
};

export default MasonryGrid;
