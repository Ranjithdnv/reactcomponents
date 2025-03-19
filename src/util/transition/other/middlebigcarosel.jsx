// import { useState } from "react";
// import airport from "../../../assets/airport.jpg";
// import n from "../../../assets/bird.png";

// const images = [
//   airport,
//   airport,
//   n,
//   airport,
//   airport,
//   airport,
//   airport,
//   airport,
// ];

// const CarouselI = () => {
//   const [index, setIndex] = useState(2); // ✅ Start with the third image centered

//   const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
//   const prevSlide = () =>
//     setIndex((prev) => (prev - 1 + images.length) % images.length);

//   return (
//     <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
//       {/* Left Button */}
//       <button
//         onClick={prevSlide}
//         className="p-3 rounded-full bg-white shadow-xl hover:bg-gray-300 transition-all duration-300 active:scale-90"
//       >
//         ⬅️
//       </button>

//       {/* Carousel Container */}
//       <div className="overflow-hidden w-[700px]">
//         <div
//           className="flex gap-6 transition-transform duration-700 ease-in-out"
//           style={{
//             transform: `translateX(-${index * 140}px)`, // ✅ Moves the images smoothly
//           }}
//         >
//           {images.map((src, i) => {
//             const isMiddle = i === index; // ✅ Only the middle image is taller
//             const scale = isMiddle ? 1.2 : 1;
//             const opacity = Math.abs(i - index) > 2 ? 0.5 : 1;
//             const height = isMiddle ? 180 : 120; // ✅ Middle image gets extra height

//             return (
//               <img
//                 key={`image-${i}`}
//                 src={src}
//                 className="rounded-xl shadow-2xl border-4 border-white transition-all duration-500 ease-in-out"
//                 style={{
//                   width: `${scale * 120}px`,
//                   height: `${height}px`, // ✅ Only middle image is taller
//                   opacity,
//                   filter: isMiddle ? "brightness(1.1)" : "brightness(0.8)",
//                 }}
//               />
//             );
//           })}
//         </div>
//       </div>

//       {/* Right Button */}
//       <button
//         onClick={nextSlide}
//         className="p-3 rounded-full bg-white shadow-xl hover:bg-gray-300 transition-all duration-300 active:scale-90"
//       >
//         ➡️
//       </button>
//     </div>
//   );
// };

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const items = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

// const CarouselI = () => {
//   const [activeIndex, setActiveIndex] = useState(1);

//   const handleNext = () => {
//     setActiveIndex((prev) => (prev + 1) % items.length);
//   };

//   const handlePrev = () => {
//     setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
//   };

//   return (
//     <div className="carousel-container flex items-center bg-black gap-4 justify-center mt-10">
//       <button onClick={handlePrev} className="p-2 bg-gray-300 rounded">
//         &lt;
//       </button>

//       <div className="carousel flex items-center justify-start bg-blue-500 overflow-hidden relative">
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className={`transition-all duration-300 flex items-center justify-center bg-blue-600 ${
//               index === activeIndex
//                 ? "active font-bold flex-shrink-0 !w-32 h-32 bg-blue-500 shadow-2xl z-10 transform scale-110 mx-5"
//                 : " flex-grow-0 flex-shrink-0 flex    !w-24 h-24 mx-5"
//             }`}
//           ></div>
//         ))}
//       </div>

//       <button onClick={handleNext} className="p-2 bg-gray-300 rounded">
//         &gt;
//       </button>
//     </div>
//   );
// };

// export default CarouselI;
