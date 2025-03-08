import React from "react";
import style from "./index.module.css";
const Text1 = () => {
  return (
    <div className=" p-5   !border-red-500  ">
      <button
        className={`${style.button} active:border-red-500 active:bg-green-100 active:rounded   active:outline-transparent`}
        data-text="Awesome"
      >
        {/* <span className={style["actual-text"]}>&nbsp;uiverse&nbsp;</span>
        <span aria-hidden="true" className={style["hover-text"]}>
          <span className={style["actual-text"]}>&nbsp;uiverse&nbsp;</span>
        </span> */}
        <span class={style["actual-text"]}>&nbsp;uiverse&nbsp;</span>
        <span aria-hidden="true" class={style["hover-text"]}>
          &nbsp;uiverse&nbsp;
        </span>
      </button>
    </div>
  );
};

export default Text1;
