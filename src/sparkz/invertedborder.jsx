// const InvertedBorderRadiusBar = () => {
//   return (
//     <div className="flex flex-col items-center">
//       {/* Bar with Inverted Border Radius */}
//       <div
//         className="h-[300px] w-[300px] bg-yellow-500"
//         style={{
//           clipPath:
//             "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
//         }}
//       />
//     </div>
//   );
// };

// export default InvertedBorderRadiusBar;
const InvertedBorderRadiusBar = () => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="h-[300px] w-[300px] bg-yellow-500"
        style={{
          clipPath: `polygon(
              15% 0%, 85% 0%, 
              100% 15%, 100% 85%, 
              85% 100%, 15% 100%, 
              0% 85%, 0% 15%
            )`,
        }}
      />
    </div>
  );
};

export default InvertedBorderRadiusBar;
