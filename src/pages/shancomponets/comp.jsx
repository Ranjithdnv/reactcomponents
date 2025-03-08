import React, { useState } from "react";
import CheckBoxField from "../../componentsapp/checkbox"; // Import CheckBoxField
import DatePickerField from "../../componentsapp/DatePickerField"; // Import DatePickerField
import InputField from "../../componentsapp/InputField"; // Import InputField

const Comp = () => {
  const [selectedItems, setSelectedItems] = useState([]); // State for selected checkboxes
  const [selectedDate, setSelectedDate] = useState(null); // State for date selection
  const [textInput, setTextInput] = useState(""); // State for text input
  const [passwordInput, setPasswordInput] = useState(""); // State for password input

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedItems((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle text input change
  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  // Handle password input change
  const handlePasswordInputChange = (event) => {
    setPasswordInput(event.target.value);
  };

  return (
    <div className="p-4">
      <h2 className="mb-2 font-bold">Select Options:</h2>
      {options.map((option) => (
        <CheckBoxField
          key={option.value}
          label={option.label}
          name={option.value}
          value={option.value}
          selectAllChecked={selectedItems.includes(option.value)}
          onChange={handleCheckboxChange}
        />
      ))}

      <div className="mt-4">
        <strong>Selected Items:</strong>{" "}
        {selectedItems.length > 0 ? selectedItems.join(", ") : "None"}
      </div>

      {/* Date Picker Field */}
      <h2 className="mt-4 mb-2 font-bold">Pick a Date:</h2>
      <DatePickerField
        label="Select Date"
        name="date-picker"
        value={selectedDate}
        onDateChange={handleDateChange}
        placeholder="Choose a date"
        required={true}
        format="yyyy-MM-dd"
        maxDate={new Date()}
      />

      {/* Input Fields */}
      <h2 className="mt-4 mb-2 font-bold">Text Input:</h2>
      <InputField
        label="Enter Text"
        name="text-input"
        value={textInput}
        onChange={handleTextInputChange}
        placeholder="Type something..."
        required={true}
      />
    </div>
  );
};

export default Comp;
