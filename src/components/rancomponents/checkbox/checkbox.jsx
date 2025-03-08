import React, { useState } from 'react';
import style from './index.module.css';

const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked((prev) => !prev); // Toggle the state
  };

  return (
    <div>
      <label className={style.container}>
        <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
        <div className={style.checkmark}></div>
      </label>
    </div>
  );
};

export default Checkbox;
