import React from "react";
import { Card } from "antd";
import { FaWallet, FaGlobe, FaUserPlus, FaShoppingCart } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaTicketSimple } from "react-icons/fa6";

const iconMap = {
  wallet: <FaWallet className="!text-white bg-brand p-2 rounded-md" />,
  globe: <FaGlobe className="!text-white bg-brand p-2  rounded-md" />,
  user: <IoDocumentTextSharp className="!text-white bg-brand p-2 rounded-md" />,
  cart: <FaShoppingCart className="!text-white bg-brand p-2 rounded-md " />,
  ticket: <FaTicketSimple className="!text-white bg-brand p-2 rounded-md " />,
  person:<FaUserPlus className="!text-white bg-brand p-2 rounded-md " />,
};

const CountCard = ({ title, amount, percentage, icon }) => {
  return (
    <Card className="shadow-md rounded-md  w-full lg:w-auto xl:w-[300px] max-w-sm max-h-24 ">
      <div className="flex items-center flex-row ">
        <div className="flex-1">
          <div className="text-[#A0AEC0] text-left">{title}</div>
          <div className="text-xl text-brand font-bold flex gap-2 items-center">
            {amount}
            {/* <span>
              <div
                className={`text-sm ${
                  percentage >= 0 ? "!text-[#48BB78]" : "!text-[#E53E3E]"
                }`}
              >
                {percentage >= 0 ? `+${percentage}%` : `${percentage}%`}
              </div>
            </span> */}
          </div>
        </div>
        <div className="text-3xl mr-4">{iconMap[icon]}</div>
      </div>
    </Card>
  );
};

export default CountCard;
