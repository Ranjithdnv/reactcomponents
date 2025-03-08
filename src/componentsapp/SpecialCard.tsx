import React from "react";

function SpecialCard({ data }) {
  return (
    <div className="spec-card bg-brand text-white">
      <div className="spec-flex">
        <ul>
          <li className="text-left font-bold ">{data.title}</li>
        </ul>

        <p className="text-left">{data.description}</p>
      </div>
    </div>
  );
}

export default SpecialCard;
