import React from "react";
import "./indexcard12.css";
const Card12 = () => {
  return (
    <div>
      <div class="group relative  justify-center overflow-hidden h-72  groupcls  bg-sky-300 rounded-xl">
        <div class="absolute mychange1  h-64  p-4 bg-gray-50 z-10 top-4 left-4 opacity-50 rounded-2xl blur  group-hover:blur-none [transform:rotate3d(1_,-1,_1,_30deg)] duration-500 group-hover:[transform:rotate3d(1_,-1,_1,_0deg)]"></div>
        <div class="absolute mychange w-56 pr-8 h-64 z-10 top-4 right-1 rounded-2xl flex flex-col justify-end items-start gap-4 [transform:rotate3d(1_,-1,_1,_30deg)] duration-500 group-hover:[transform:rotate3d(1_,-1,_1,_0deg)]">
          <span class="text-red-800 text-2xl font-extrabold">Card title</span>
          <p class="text-gray-800 mychange2 !max-w-6 font-bold">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </p>
          <button class="bg-gray-50 px-3 ml-4  py-2 mb-1 rounded-xl hover:bg-sky-600 duration-300">
            Book
          </button>
        </div>

        <svg
          y="0"
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          width="100"
          viewBox="0 0 10 10"
          preserveAspectRatio="xMidYMid meet"
          height="100"
          class="fill-sky-400 w-64 h-64 absolute -bottom-20 -left-32"
        >
          <path d="M0,5A5,5,0,1,0,5,0,5,5,0,0,0,0,5ZM8.12,5A3.12,3.12,0,1,1,5,1.88,3.12,3.12,0,0,1,8.12,5Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Card12;
