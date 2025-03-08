import React from "react";
import Style from "./index.module.css";
const Card8 = () => {
  return (
    <div>
      <div class={Style.card}>
        <div class={Style.border}></div>
        <div class={Style.content}>
          <div class={Style.logo}>
            <div className={` ${Style.textdoubled}`}>KKKKKKKKKKKKKKKKKKKKK</div>

            <span class={Style.trail}></span>
          </div>
          <div class={Style.logo}>
            <div className={` ${Style.textdoubled}`}>KKKKKKKKKKKKKKKKKKKKK</div>
            <span class={Style.trail}></span>
          </div>

          <span class={Style["logo-bottom-text"]}>ranjithkumar</span>
        </div>
        <span class={Style["bottom-text"]}>universe of ui</span>
      </div>
    </div>
  );
};

export default Card8;
