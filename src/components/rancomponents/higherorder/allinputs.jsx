import React, { useState } from "react";
import { Select, Input, Tag } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Search } = Input;

const validateInput = (type, value) => {
  const patterns = {
    phone: /^\d{10}$/, // 10-digit phone number
    pincode: /^\d{6}$/, // 6-digit pincode
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, // Improved Email Format
    name: /^[a-zA-Z ]{2,50}$/, // Only letters and spaces, 2-50 chars
  };
  return type in patterns ? patterns[type].test(value) : true;
};

const UnifiedComponent = ({
  type,
  placeholder,
  type2,
  itemsClassname,
  xIconClassname,
  value,
  onChange,
  options = [],
  ...props
}) => {
  // MultiSelect Component
  if (type === "select") {
    return (
      <Select
        mode={props.mode || "multiple"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Select an option"}
        style={{ width: props.width || 250 }}
        maxTagCount={props.maxTagCount || 4}
        showSearch
        tagRender={({ label, closable, onClose }) => (
          <Tag className={itemsClassname} closable={closable} onClose={onClose}>
            {label}
          </Tag>
        )}
        suffixIcon={
          value?.length > 0 && (
            <CloseCircleOutlined
              className={xIconClassname}
              onClick={() => onChange([])}
              style={{ fontSize: 16, cursor: "pointer" }}
            />
          )
        }
        {...props}
      >
        {options.map(({ value, label }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    );
  }

  // Input Component
  if (type === "input") {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(null);
    const handleChange = (eOrValue) => {
      const newValue =
        typeof eOrValue === "object" ? eOrValue.target.value : eOrValue;
      console.log(newValue);
      console.log(type2);
      if (type2 && !validateInput(type2, newValue)) {
        setError(`Invalid ${type2}`);
        console.log("000000000000000000");
      } else {
        setError(null);
      }
      setInputValue(newValue);
      if (onChange) onChange(newValue);
    };

    return (
      <>
        <Input
          placeholder={placeholder || "Enter text..."}
          value={inputValue}
          onChange={handleChange}
          style={{ width: props.width || 250 }}
          suffix={
            <span>
              {" "}
              {inputValue && (
                <CloseCircleOutlined
                  className="!text-blue-500 !text-base"
                  onClick={() => handleChange("")}
                  style={{ fontSize: 18, color: "red", cursor: "pointer" }}
                />
              )}{" "}
            </span>
          }
          {...props}
        />{" "}
        <span> {error}</span>
      </>
    );
  }

  // Search Component
  if (type === "search") {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (eOrValue) => {
      const newValue =
        typeof eOrValue === "object" ? eOrValue.target.value : eOrValue;
      setSearchValue(newValue);
      if (onChange) onChange(newValue);
    };

    return (
      <Search
        placeholder={placeholder || "Search..."}
        value={searchValue}
        onSearch={props.onSearch}
        onChange={handleSearch}
        enterButton
        style={{ width: props.width || 300 }}
        suffix={
          <span>
            {" "}
            {searchValue && (
              <CloseCircleOutlined
                className="!text-blue-500 !text-base cursor-pointer"
                onClick={() => handleSearch("")}
                style={{ fontSize: 18, color: "red" }}
              />
            )}
          </span>
        }
        {...props}
      />
    );
  }

  return null; // If no valid type is provided
};

export default UnifiedComponent;
