import React from "react";

const CheckBoxField = (props) => {
  const {
    label,
    name,
    value,
    className = "flex items-center",
    onChange,
    otherProps,
    selectAllChecked,
  } = props;
  return (
    <div className={className}>
      <input
        id={name + "-field"}
        type="checkbox"
        name={name}
        value={value}
        checked={selectAllChecked}
        className="w-4 h-4 text-[#004d80] bg-gray-100 border-gray-300 rounded focus:ring-[#004d80] dark:focus:ring-[#004d80] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 custom-checkbox"
        onChange={onChange}
        {...otherProps}
      />
      {label && (
        <label
          htmlFor={name + "-field"}
          className="ml-2 text-sm font-medium text-gray-600 dark:text-[#000000]"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CheckBoxField;
