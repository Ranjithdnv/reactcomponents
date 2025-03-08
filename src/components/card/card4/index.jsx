import React from "react";
import "./index.css";
const Card4 = () => {
  return (
    <div>
      <div class="notifications-container">
        <div class="success">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                class="success-svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div class="success-prompt-wrap">
              <p class="success-prompt-heading">
                Order completed
                <span class="checkmark">✓</span>
              </p>
              <div class="success-prompt-prompt">
                <p>
                  You're happy now? Does this impulsive action is really going
                  to satisfy you? Don't answer me, answer yourself. Anyway, your
                  party-size pizza combo is on it's way.
                </p>
              </div>
              <div class="success-button-container">
                <button class="success-button-main" type="button">
                  View status
                </button>
                <button class="success-button-secondary" type="button">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card4;
