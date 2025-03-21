import React from "react";
import "./index.css";
const Card3 = () => {
  return (
    <div>
      <div class="notifications-container">
        <div class="error-alert">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                class="error-svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div class="error-prompt-container">
              <p class="error-prompt-heading">
                Your password isn't strong enough
              </p>
              <div class="error-prompt-wrap">
                <ul class="error-prompt-list" role="list">
                  <li>Password must be at least !8 characters</li>
                  <li>Password must include Elon's baby name</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card3;
