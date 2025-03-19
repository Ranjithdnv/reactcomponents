import React from "react";
import TailwindDemo from "../child/child1";
import TailwindRareClassesDemo from "../child/child2";
import { Divider } from "antd";
import { PushpinOutlined } from "@ant-design/icons";
const Tailwindparent = () => {
  return (
    <div className="w-full">
      {/* <TailwindDemo></TailwindDemo> */}
      {/* <TailwindRareClassesDemo></TailwindRareClassesDemo> */}
      <div className=" w-full min-h-[100vh] py-4 px-12 ">
        <div className="flex w-full justify-between  p-4 ">
          {/* Left Section */}{" "}
          <div className="p-2 ">
            {" "}
            <div className="h-7 w-7 rounded-full bg-yellow-300"></div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="p-2 text-xl ">INTIMATATE GLOBAL</div>
          </div>
          {/* Right Section */}
          <div className="flex gap-2  justify-end items-center">
            <div className="p-2 ">% Offer</div>
            <div className="p-2 ">Item 4</div>
            <div className="p-2 ">
              <div className="h-7 w-7 rounded-full bg-yellow-300"></div>
            </div>
            <div className="p-2 ">
              <div className="h-7 w-7 rounded-full bg-yellow-300"></div>
            </div>
          </div>
        </div>

        {/* Black Divider */}
        <hr className="border-t-2 ml-16 border-gray-500 my-4" />
        <div className="flex">
          {" "}
          <div className="flex text-xl font-semibold text-white  mr-12  justify-center h-12 items-center  rounded-2xl w-full bg-blue-900 text-center">
            {" "}
            Welcome Vivek ...! What are Plans Today?
          </div>
        </div>
        <div className=" py-3 text-lg font-medium">
          Your student application process
        </div>
        <div className="flex relative flex-col  h-24 pl-24  rounded-2xl w-full  bg-blue-900 ">
          <div className=" flex gap-8  relative p-4 justify-between px-12">
            <div className="   top-4  left-32 absolute">
              {" "}
              ....................................................................................................................................................................✈️
            </div>
            <div className=" flex-col items-center w-44 justify-center">
              <PushpinOutlined className="  h-8 w-8  font-bold text-4xl flex justify-center text-red-500" />
              <div className=" w-full flex justify-center">
                Apllication received
              </div>{" "}
            </div>{" "}
            <div className=" flex-col items-center w-44 justify-center">
              <PushpinOutlined className="  h-8 w-8  font-bold text-4xl flex justify-center text-red-500" />
              <div className=" w-full flex justify-center">
                Apllication received
              </div>{" "}
            </div>{" "}
            <div className=" flex-col items-center w-44 justify-center">
              <PushpinOutlined className="  h-8 w-8  font-bold text-4xl flex justify-center text-red-500" />
              <div className=" w-full flex justify-center">
                Apllication received
              </div>{" "}
            </div>
          </div>
        </div>
        <div className="flex h-[50vh] items-center !gap-24 justify-center">
          <div className=" h-44 flex  p-4 gap-12  rounded-2xl justify-around   flex-col border-black border-2">
            <div className="   text-lg font-semibold">
              {" "}
              Toursist visa apllicant
            </div>{" "}
            <div className="mr-16">
              {" "}
              <div className=" flex justify-between    items-center">
                <div className=" py-1 pl-4 pr-2 bg-orange-300 rounded">
                  in - progress
                </div>{" "}
                <div className="h-12 w-12 rounded-full bg-orange-500"></div>{" "}
              </div>{" "}
            </div>
            <div className=" pl-4"> ⏰ Started 2 weeks ago</div>
          </div>{" "}
          <div className=" h-44 flex  p-4 gap-12  rounded-2xl justify-around   flex-col border-black border-2">
            <div className="   text-lg font-semibold">
              {" "}
              Toursist visa apllicant
            </div>{" "}
            <div className="mr-16">
              {" "}
              <div className=" flex justify-between    items-center">
                <div className=" py-1 pl-4 pr-2 bg-orange-300 rounded">
                  in - progress
                </div>{" "}
                <div className="h-12 w-12 rounded-full bg-orange-500"></div>{" "}
              </div>{" "}
            </div>
            <div className=" pl-4"> ⏰ Started 2 weeks ago</div>
          </div>{" "}
          <div className=" h-44 flex  p-4 gap-12  rounded-2xl justify-around   flex-col border-black border-2">
            <div className="   text-lg font-semibold">
              {" "}
              Toursist visa apllicant
            </div>{" "}
            <div className="mr-16">
              {" "}
              <div className=" flex justify-between    items-center">
                <div className=" py-1 pl-4 pr-2 bg-orange-300 rounded">
                  in - progress
                </div>{" "}
                <div className="h-12 w-12 rounded-full bg-orange-500"></div>{" "}
              </div>{" "}
            </div>
            <div className=" pl-4"> ⏰ Started 2 weeks ago</div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Tailwindparent;
