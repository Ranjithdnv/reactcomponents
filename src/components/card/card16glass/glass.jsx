import React from "react";

const Glass = () => {
  return (
    <div className="w-full  flex justify-center dark:bg-red-400 ">
      <div className=" w-60 ">
        {" "}
        <div className="relative  h-fit  w-fit flex -skew-x-6 items-center justify-center  m-2">
          {/* Glassmorphic Card */}
          <div className="  backdrop-blur-3xl w-fit  bg-white/10 border border-white/20 shadow-lg rounded-2xl p-2 ">
            <h1 className="text-white  font-bold   ">
              Glass Effect Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Laudantium esse exercitationem, fuga voluptates porro alias
            </h1>
            <p className="text-white/80 mt-2">This is a frosted glass UI.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Glass;
