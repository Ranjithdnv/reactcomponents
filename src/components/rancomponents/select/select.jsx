import React, { useState } from "react";
import { Select, Tag } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const MultiSelect = ({
  options,
  itemsClassname,
  xIconClassname,
  placeholder = "Select an option",
  width = 250,
  maxTagCount = 4,
  onChange,
  ...otherProps
}) => {
  const [selectedValues, setSelectedValues] = useState(null);

  const handleChange = (selected) => {
    console.log("Selected:", selected);
    setSelectedValues(selected);
    if (onChange) {
      onChange(selected);
    }
  };

  return (
    <Select
      value={selectedValues}
      onChange={handleChange}
      placeholder={placeholder}
      style={{ width }}
      maxTagCount={maxTagCount}
      showSearch
      tagRender={({ label, closable, onClose }) => (
        <Tag className={itemsClassname} closable={closable} onClose={onClose}>
          {label}
        </Tag>
      )}
      suffixIcon={
        selectedValues && (
          <CloseCircleOutlined
            className={xIconClassname}
            onClick={() => setSelectedValues(null)}
            style={{ fontSize: 16, cursor: "pointer" }}
          />
        )
      }
      {...otherProps}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default MultiSelect;
