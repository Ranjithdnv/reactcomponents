import React from "react";
import "./index.css";

const Form1 = () => {
  return (
    <div>
      <div className="modal">
        <form className="form">
          <div className="payment--options">
            <button name="paypal" type="button">
              <svg
                xmlSpace="preserve"
                viewBox="0 0 124 33"
                height="33px"
                width="124px"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>PayPal</title>
                <path
                  d="M46.211,6.749h-6.839c-0.468,0-0.866,0.34-0.939,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.564,0.658  h3.265c0.468,0,0.866-0.34,0.939-0.803l0.746-4.73c0.072-0.463,0.471-0.803,0.938-0.803h2.165c4.505,0,7.105-2.18,7.784-6.5  c0.306-1.89,0.013-3.375-0.872-4.415C50.224,7.353,48.5,6.749,46.211,6.749z"
                  fill="#253B80"
                ></path>
              </svg>
            </button>

            <button name="apple-pay" type="button">
              <svg
                xmlSpace="preserve"
                viewBox="0 0 512 210.2"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Apple Pay</title>
                <path
                  d="M93.6,27.1C87.6,34.2,78,39.8,68.4,39c-1.2-9.6,3.5-19.8,9-26.1c6-7.3,16.5-12.5,25-12.9  C103.4,10,99.5,19.8,93.6,27.1"
                  fill="black"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form1;
