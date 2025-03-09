import React from "react";
import TailwindDemo from "../child/child1";
import TailwindRareClassesDemo from "../child/child2";

const Tailwindparent = () => {
  return (
    <div>
      Tailwindparent
      {/* <TailwindDemo></TailwindDemo> */}
      <TailwindRareClassesDemo></TailwindRareClassesDemo>
    </div>
  );
};

export default Tailwindparent;
