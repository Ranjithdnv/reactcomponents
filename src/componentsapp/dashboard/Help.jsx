import React from "react";
import { Button } from "antd";

const Help = () => (
  <div className="p-4 shadow-lg rounded-lg bg-brand text-white flex items-center justify-center flex-col">
    <h2 className="text-xl  font-bold mb-4">Need help?</h2>
    <p className="mb-4">Please check our docs</p>
    <Button
      className="bg-white text-brand w-full rounded-lg max-w-xs"
      type="primary"
    >
      Documentation
    </Button>
  </div>
);

export default Help;
