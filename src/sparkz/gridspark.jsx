// import airport from "../assets/airport.jpg";
// import n from "../assets/bird.png";

// export default function ImageFlexLayout() {
//   const images = [
//     airport,
//     airport,
//     airport,
//     airport,
//     airport,
//     airport,
//     airport,
//   ];

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
//       <div className="flex flex-wrap h-fit gap-0 w-full max-w-6xl">
//         {/* First Image */}
//         <div
//           style={{ width: "30%" }}
//           className="bg-white relative   shadow-lg h-32  overflow-hidden"
//         >
//           <div className="absolute  !mr-2 top-0 right-5 w-full h-full flex justify-center items-center">
//             <img
//               src={images[0]}
//               alt="Image 1"
//               className="w-full h-full object-cover flex-shrink-0"
//             />
//           </div>
//         </div>

//         {/* Second Image */}
//         <div
//           style={{ width: "30%" }}
//           className="bg-white relative shadow-lg h-32  "
//         >
//           <div className="absolute top-0   right-5 w-full h-full flex justify-center items-center">
//             <img
//               src={images[1]}
//               alt="Image 2"
//               className="w-full h-full object-cover flex-shrink-0"
//             />
//           </div>
//         </div>

//         {/* Third Image (Adjusted height issue) */}
//         <div
//           style={{ width: "30%" }}
//           className="bg-white relative shadow-lg h-32  overflow-hidden"
//         >
//           <div className="absolute bottom-0  left-0  aspect-auto bg-black flex justify-center items-center">
//             <img
//               src={images[2]}
//               alt="Image 3"
//               className="w-full h-full object-cover flex-shrink-0"
//             />
//           </div>
//         </div>

//         {/* Fourth Image */}
//         <div
//           style={{ width: "30%" }}
//           className="bg-white shadow-lg h-32  overflow-hidden flex justify-center items-center"
//         >
//           <img
//             src={images[3]}
//             alt="Image 4"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Fifth Image */}
//         <div
//           style={{ width: "30%" }}
//           className="bg-white shadow-lg h-32  overflow-hidden flex flex-col justify-between"
//         >
//           <img
//             src={images[4]}
//             alt="Image 5"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Sixth Image */}
//         <div
//           style={{ width: "30%" }}
//           className="bg-white shadow-lg h-32  overflow-hidden flex flex-row justify-around items-end"
//         >
//           <img
//             src={images[5]}
//             alt="Image 6"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Seventh (Last) Image - Full Width */}
//         <div className="bg-white shadow-lg h-32  overflow-hidden flex w-full pb-9">
//           <img
//             src={images[6]}
//             alt="Image 7"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
// import airport from "../assets/airport.jpg";

// export default function ImageLayout() {
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
//       <div className="w-full max-w-6xl text-[0px] ">
//         {/* Row 1 */}
//         <div className="inline-block w-[22%] mr-2 aspect-[3/2] bg-white shadow-lg overflow-hidden border border-gray-300">
//           <img
//             src={airport}
//             alt="Image 1"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="inline-block w-[22%] mr-2 aspect-[3/2] bg-white shadow-lg overflow-hidden border border-gray-300">
//           <img
//             src={airport}
//             alt="Image 2"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="inline-block w-[26%] mr-2 aspect-[16/9] bg-white shadow-lg overflow-hidden border border-gray-300">
//           <img
//             src={airport}
//             alt="Image 3"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="inline-block w-[12%] mr-2 aspect-[9/16] bg-white shadow-lg overflow-hidden border border-gray-300">
//           <img
//             src={airport}
//             alt="Image 4"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Row 2 */}
//         <div className="inline-block w-[23%]  mr-2 aspect-[4/2.8] bg-white shadow-lg overflow-hidden border border-gray-300 mt-2">
//           <img
//             src={airport}
//             alt="Image 5"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="inline-block w-[23%] mb-2 mr-2 aspect-[4/2.8] bg-white shadow-lg overflow-hidden border border-gray-300 mt-2">
//           <img
//             src={airport}
//             alt="Image 6"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="inline-block w-[25%] mr-2  aspect-[4.2/2.8] mb-1 bg-white shadow-lg overflow-hidden border border-gray-300 mt-2">
//           <img
//             src={airport}
//             alt="Image 7"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="inline-block w-[23%] aspect-[5/4] -mb-1 bg-white shadow-lg overflow-hidden border border-gray-300 mt-2">
//           <img
//             src={airport}
//             alt="Image 8"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import airport from "../assets/airport.jpg";

export default function ImageGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => setHoveredIndex(i), i * 500); // Staggered hover
      }

      // Reset hover effect after last image
      setTimeout(() => setHoveredIndex(null), 4000); // Ensures last image doesn't stay
    }, 5000); // Repeat every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="grid grid-cols-4 gap-4 max-w-6xl w-full">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className={`bg-white shadow-lg overflow-hidden border border-gray-300 aspect-[4/3] transition-transform duration-500 ${
              hoveredIndex === index ? "scale-110 shadow-2xl" : ""
            }`}
          >
            <img
              src={airport}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
