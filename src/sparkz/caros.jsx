import React, { useState } from "react";
import airport from "../assets/airport.jpg";
import airportn from "../assets/bird.png"; // Replace with actual images

const images = [airport, airportn, airport]; // Replace with different images

const SimpleCarousel = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className=" w-full flex justify-center items-center max-w-3xl mx-auto">
      {/* Carousel Container */}
      <button
        onClick={prevSlide}
        className=" transform -translate-y-1/2 bg-black text-white px-3 py-1 rounded-full"
      >
        ‹
      </button>
      <div className="relative w-[70%] h-40 overflow-hidden">
        <div className="flex transition-transform h-40 duration-500 ease-in-out">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`w-full  h-40  object-fill rounded-lg ${
                index === current ? "block" : "hidden"
              }`}
              alt="Carousel Slide"
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}

      <button
        onClick={nextSlide}
        className=" transform -translate-y-1/2  bg-white text-black px-3 py-1 rounded-full"
      >
        ›
      </button>
    </div>
  );
};

export default SimpleCarousel;
