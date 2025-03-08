// import React from 'react'
// import style from './index.module.css'
// const Tooltip5 = () => {
//   return (

//     <div>
//     <div class="custom-tooltip-container">
//       <button class="custom-tooltip-btn">Hover me</button>
//       <div class="custom-tooltip-content">
//         <span class="custom-tooltip-arrow"></span>
//         <p class="custom-tooltip-text">
//           Warning: Hovering too long may result in a sudden craving for cookies!
//         </p>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default Tooltip5
import React from "react";
import style from "./index.module.css"; // Ensure this CSS file exists and follows CSS Modules syntax

const Tooltip5 = () => {
  return (
    <div className={style.customtooltipcontainer}>
      <button className={style.customtooltipbtn}>Hover me</button>
      <div className={style.customtooltipcontent}>
        <span className={style.customtooltiparrow}></span>
        <p className={style.customtooltiptext}>
          Warning: Hovering too long may result in a sudden craving for cookies!
          Warning: Hovering too long may result in a sudden craving for cookies!
        </p>
      </div>
    </div>
  );
};

export default Tooltip5;
