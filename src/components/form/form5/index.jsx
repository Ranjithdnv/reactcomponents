import React from "react";
import "./index.css";

const Form5 = () => {
  return (
    <div className="">
      <div className="login-box">
        <form>
          <div className="user-box">
            <input type="text" required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" required />
            <label>Password</label>
          </div>
          <center>
            <a href="#">
              SEND
              <span></span>
            </a>
          </center>
        </form>
      </div>
    </div>
  );
};

export default Form5;
