import React, { useState } from "react";
import MultiSelect from "../../components/rancomponents/select/select";
import ReusableInput from "../../components/rancomponents/input/inputant";
import ReusableSearch from "../../components/rancomponents/searchinput/search";
import UnifiedComponent from "../../components/rancomponents/higherorder/allinputs";

const Checkant = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (value) => {
    setInputValue(value);
    console.log("Parent received input:", value);
  };
  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
    console.log("Parent received selected values:", selected);
  };
  const handleSearch = (value) => {
    setSearchValue(value);
    console.log("Searched value:", value);
  };

  return (
    <div>
      <UnifiedComponent
        type="select"
        mode="tags"
        value={selectedOptions}
        itemsClassname="text-blue-500 border-blue-500"
        xIconClassname="!text-red-500 !text-base"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
        onChange={handleSelectChange}
      />

      <h2>MultiSelect Component</h2>
      <UnifiedComponent
        placeholder="Enter your name..."
        type="input"
        type2="email"
        onChange={handleInputChange}
        value={inputValue}
      />
      <UnifiedComponent
        type="search"
        placeholder="Search name..."
        onSearch={handleSearch}
        value={searchValue}
      />
      {/* <MultiSelect
        mode="tags"
        itemsClassname="text-blue-500 border-blue-500"
        xIconClassname="!text-red-500 !text-base"
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
        onChange={handleSelectChange}
      />
      {Array.isArray(selectedOptions) && selectedOptions.length > 0 && (
        <p>Selected: {selectedOptions.join(", ")}</p>
      )}
      <div>
        <h2>Reusable Input Component</h2>
        <ReusableInput
          placeholder="Enter your name..."
          type="phone"
          onChange={handleInputChange}
        />
        <p>Entered Value: {inputValue}</p>
      </div>
      <div>
        <h2>Search Component</h2>
        <ReusableSearch placeholder="Search name..." onSearch={handleSearch} />
        <p>Current Search: {searchValue}</p>
      </div> */}
    </div>
  );
};

export default Checkant;
