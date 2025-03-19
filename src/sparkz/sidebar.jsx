import airport from "../assets/siebarsparx.png";
import { useState } from "react";
export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    // <div className=" bg-red-300  ">

    <div className="fixed   left-0 top-2/3 -translate-y-1/2  w-16">
      {/* <div className="w-6 z-30 h-fit custom-top absolute py-4 top-1/2 -translate-x-1/2 left-3 bg-blue-900 "> */}
      <div className="w-4 h-fit custom-top2 custom-top  top-1/2 transform   bg-blue-500 hover:w-12 rounded-full transition-all duration-1000">
        <div className="h-fit w-full py-4 items-center flex flex-col ">
          <div className=" w-7 h-7 bg-red-700"></div>{" "}
          <div className=" w-7 h-7 bg-red-700"></div>{" "}
          <div className=" w-7 h-7 bg-red-700"></div>{" "}
          <div className=" w-7 h-7 bg-red-700"></div>{" "}
          <div className=" w-7 h-7 bg-red-700"></div>
        </div>
      </div>
      {/* </div> */}
    </div>
    // </div>
  );
}
