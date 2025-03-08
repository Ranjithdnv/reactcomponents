import React, { useState } from "react";
import { Input } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const validateInput = (type, value) => {
  const patterns = {
    phone: /^\d{10}$/, // 10-digit phone number
    pincode: /^\d{6}$/, // 6-digit pincode
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Email format
    name: /^[a-zA-Z ]{2,50}$/, // Only letters and spaces, 2-50 chars
  };
  return type in patterns ? patterns[type].test(value) : true;
};

const ReusableInput = ({
  placeholder = "Enter text...",
  width = 250,
  type,
  onChange,
  ...otherProps
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    e.stopPropagation();
    const newValue = e.target.value;
    if (type && !validateInput(type, newValue)) {
      setError(`Invalid ${type}`);
    } else {
      setError(null);
    }
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        style={{ width }}
        suffix={
          <span
            style={{ width: 20, display: "inline-block", textAlign: "center" }}
          >
            {value && (
              <CloseCircleOutlined
                className="!text-blue-500 !text-base"
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent losing focus
                  setValue("");
                }}
                style={{ fontSize: 18, color: "red", cursor: "pointer" }}
              />
            )}
          </span>
        }
        {...otherProps}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default ReusableInput;
