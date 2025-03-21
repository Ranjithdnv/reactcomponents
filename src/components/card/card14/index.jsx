// import React from "react";
// import "./indexcard14.css";
// const Card14 = () => {
//   return (
//     <div>
//       <div class="wrapper">
//         <div class="inner" style="--quantity: 10;">
//           <div class="card" style="--index: 0;--color-card: 142, 249, 252;">
//             <div class="img"></div>
//           </div>
//           <div class="card" style="--index: 1;--color-card: 142, 252, 204;">
//             <div class="img"></div>
//           </div>
//           <div class="card" style="--index: 2;--color-card: 142, 252, 157;">
//             <div class="img"></div>
//           </div>
//           <div class="card" style="--index: 3;--color-card: 215, 252, 142;">
//             <div class="img"></div>
//           </div>
//           <div class="card" style="--index: 4;--color-card: 252, 252, 142;">
//             <div class="img"></div>
//           </div>
//           <div class="card" style="--index: 5;--color-card: 252, 208, 142;">
//             <div class="img"></div>
//           </div>
//           <div class="card" style="--index: 6;--color-card: 252, 142, 142;">
//             <div class="img"></div>
//           </div>
//           <div class="card" style="--index: 7;--color-card: 252, 142, 239;">
//             <div class="img"></div>
//           </div>
//           <div class="card" style="--index: 8;--color-card: 204, 142, 252;">
//             <div class="img"></div>
//           </div>
//           <div class="card" style="--index: 9;--color-card: 142, 202, 252;">
//             <div class="img"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card14;
import birdImage from "../../../assets/bird.png";

import React from "react";
import "./indexcard14.css";
const Card14 = () => {
  return (
    <div>
      <div className="wrapper">
        <div className="inner_round" style={{ "--quantity": 10 }}>
          <div
            className="card_round"
            style={{ "--index": 0, "--color-card": "142, 249, 252" }}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(${birdImage})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div
            className="card_round"
            style={{ "--index": 1, "--color-card": "142, 252, 204" }}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(${birdImage})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div
            className="card_round"
            style={{ "--index": 2, "--color-card": "142, 252, 157" }}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(${birdImage})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div
            className="card_round"
            style={{ "--index": 3, "--color-card": "215, 252, 142" }}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(${birdImage})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div
            className="card_round"
            style={{ "--index": 4, "--color-card": "252, 252, 142" }}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(${birdImage})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div
            className="card_round"
            style={{ "--index": 5, "--color-card": "252, 208, 142" }}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(${birdImage})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div
            className="card_round"
            style={{ "--index": 6, "--color-card": "252, 142, 142" }}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(${birdImage})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div
            className="card_round"
            style={{ "--index": 7, "--color-card": "252, 142, 239" }}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(${birdImage})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div
            className="card_round"
            style={{ "--index": 8, "--color-card": "204, 142, 252" }}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(${birdImage})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <div
            className="card_round"
            style={{ "--index": 9, "--color-card": "142, 202, 252" }}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(${birdImage})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card14;
