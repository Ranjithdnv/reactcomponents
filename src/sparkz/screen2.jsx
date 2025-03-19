import React from "react";
import { Carousel } from "antd";
import airport from "../assets/airport.jpg";
import airportn from "../assets/bird.png";
import SimpleCarousel from "./caros";

const VisaOffers = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search Box */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search here..."
          className="p-2 w-80 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button className="px-4 py-2 bg-black text-white rounded-r-md">
          Search
        </button>
      </div>

      {/* Visa Offer Section */}
      <h2 className="text-xl font-bold text-center mb-4">
        Visa We Offer in Canada
      </h2>
      <div className="flex justify-center gap-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md text-center w-60"
          >
            <img
              src={airport}
              className="w-full h-40 object-fill rounded-md"
              alt="Tourist Visa"
            />
            <h3 className="text-lg font-semibold mt-2">Tourist Visa</h3>
            <p className="text-gray-600">₹25,000</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md">
              Apply Now
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-center my-6">Reviews</h2>

      <div className="grid grid-cols-12 h-54 px-6 gap-4">
        {/* Left Image - 5 Columns */}
        <div className="col-span-5 border-2  overflow-hidden">
          {/* <img
            src={airport}
            className="w-full h-full  object-cover rounded-md"
            alt="City View"
          /> */}
          <SimpleCarousel />
        </div>

        {/* Right Image - 7 Columns */}
        <div className="col-span-7 h-40 relative">
          <img
            src={airport}
            className="absolute inset-0 h-54  w-full h-full object-fill rounded-md"
            alt="City View"
          />
        </div>
      </div>
    </div>
  );
};

export default VisaOffers;
