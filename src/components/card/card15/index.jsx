import React from "react";
import "./indexcard15.css";
const Card15 = () => {
  return (
    <div>
      <div class="group card13-width relative h-96 w-96 [perspective:1000px]">
        <div class="absolute duration-1000 w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
          <div class="absolute w-full h-full rounded-xl bg-gradient-to-br from-violet-400 to-indigo-600 p-6 text-white [backface-visibility:hidden]"></div>

          <div class="absolute w-full h-full rounded-xl bg-gradient-to-br from-pink-400 to-purple-600 p-6 text-white [transform:rotateX(180deg)] [backface-visibility:hidden]"></div>
        </div>
      </div>
    </div>
  );
};

export default Card15;
