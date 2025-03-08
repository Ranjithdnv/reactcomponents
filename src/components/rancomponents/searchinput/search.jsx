import React, { useState, useRef } from "react";
import { Input } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const { Search } = Input;

const ReusableSearch = ({
  placeholder = "Search...",
  width = 300,
  onSearch,
  ...otherProps
}) => {
  const [value, setValue] = useState("");
  const searchInputRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Search
      className="focus:border-none focus:outline-none"
      ref={searchInputRef}
      placeholder={placeholder}
      value={value}
      onSearch={onSearch}
      onChange={handleChange}
      enterButton
      style={{ marginBottom: 16, width }}
      suffix={
        <span>
          {" "}
          {value && (
            <CloseCircleOutlined
              className="!text-blue-500 !text-base cursor-pointer"
              onMouseDown={(e) => {
                e.preventDefault();
                setValue("");
              }}
              style={{ fontSize: 18, color: "red" }}
            />
          )}
        </span>
      }
      {...otherProps}
    />
  );
};

export default ReusableSearch;
