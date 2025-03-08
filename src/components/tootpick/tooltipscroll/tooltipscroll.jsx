// import React from "react";
// import { Tooltip } from "antd";
// import { Scrollbars } from "react-custom-scrollbars-2";

// const ScrollableTooltip = ({ children, items = [] }) => {
//   const content = (
//     <div className="min-w-[180px] overflow-hidden">
//       <Scrollbars
//         className="flex justify-center"
//         style={{ height: "100px" }}
//         autoHide
//         autoHideTimeout={500}
//         autoHideDuration={200}
//         renderThumbVertical={({ style }) => (
//           <div
//             style={{
//               ...style,
//               backgroundColor: "#bbb",
//               borderRadius: "4px",
//               width: "4px",
//             }}
//           />
//         )}
//         renderTrackHorizontal={() => <div style={{ display: "none" }} />}
//       >
//         <div className="flex flex-col !w-full justify-center items-center p-1">
//           {items.map((item, index) => (
//             <div className="flex justify-center bg-blue-300 items-center">
//               <p key={index}>{item}</p>
//             </div>
//           ))}
//         </div>
//       </Scrollbars>
//     </div>
//   );

//   return (
//     <Tooltip
//       className="flex !w-fit bg-blue-300 justify-center text-center items-center" //w  !
//       title={content}
//       overlayStyle={{ maxWidth: "200px" }}
//     >
//       {children}
//     </Tooltip>
//   );
// };

// export default ScrollableTooltip;
import React from "react";
import { Tooltip } from "antd";
import { Scrollbars } from "react-custom-scrollbars-2";

const ScrollableTooltip = ({ children, items = [] }) => {
  const content = (
    <div className="min-w-[180px] overflow-hidden">
      <Scrollbars
        className="flex justify-center"
        style={{ height: "80px" }}
        autoHide
        autoHideTimeout={500}
        autoHideDuration={200}
        renderThumbVertical={({ style }) => (
          <div
            // className="!bg-brand"
            style={{
              ...style,
              backgroundColor: "rgba(65, 105, 225, 1)", // scrollbarcolor
              borderRadius: "8px",
              width: "4px",
            }}
          />
        )}
        renderTrackHorizontal={() => <div style={{ display: "none" }} />}
      >
        <div className="flex flex-col text-gray-700  !text-center !justify-center !items-center p-1">
          {items.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </Scrollbars>
    </div>
  );

  return (
    <div className="w-fit !bg-white !rounded-md !overflow-hidden">
      <Tooltip
        className="!flex !w-full bg-blue   mt-11 !justify-center !text-center !rounded-md !items-center"
        title={content}
        overlayStyle={{
          maxWidth: "200px",
          backgroundColor: "rgba(100, 155, 255, 0.5)", // Set white background
          borderRadius: "8px", //-----------------add this also
          // color: 'black'
          // ,
          // Ensure text is readable
          //border: '1px solid #ddd', // Optional: Light gray border for clarity
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)", // Optional: Subtle shadow
        }}
        overlayInnerStyle={{
          /// add this if overiding happening-------------------------------------------
          maxWidth: "200px",
          backgroundColor: "rgba(100, 155, 255, 0.5)", //  needed
          borderRadius: "8px", // Increased radius
          color: "black",
          // border: '1px solid #ddd',
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
        }}
        arrowContent={
          <div style={{ backgroundColor: "white", color: "white" }} />
        }
        arrow={{ color: "white" }}
      >
        {children}
      </Tooltip>
    </div>
  );
};

export default ScrollableTooltip;
