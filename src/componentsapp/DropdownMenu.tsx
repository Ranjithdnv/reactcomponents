import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { setBookingData } from "../redux/selectionSlice.js";

function DropdownMenu({ text, options, onChange, selected, allowClear, onFocus, city, filedName }) {
  const bookingData = useSelector((state: any) => state.reducer.bookingSearchData.searchSelection);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(selected || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const dropdownRef = useRef(null);

  const handleItemClick = (itemId) => {
    const selectedItem = options.find(option => option.id === itemId);
    setSearchTerm(selectedItem.name);
    onChange(itemId);
    setShowDropdown(false);
    //console.log(options,"options")
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setShowDropdown(true);
    //console.log(event.target.value,"event.target.value")
  };

  const handleClearSelection = () => {
    setSearchTerm("");
    onChange(null);
    setShowDropdown(false);
  };

  useEffect(()=>{
    if(!city){handleClearSelection()}
    // setSearchTerm(city);

  },[selected])

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
      setPlaceholderVisible(true);
    }
  };

  const handleInputClick = () => {
    setPlaceholderVisible(false);
    setShowDropdown(true);
  };

  const handleItemClickWithRedux = (name,id) => {
    // const selectedItem = options.find(option => option.id === itemId);
    //console.log(name,id,"name,id")
    setSearchTerm(name);
    onChange(id);
    setShowDropdown(false);
    //console.log(options,"options")
  };

  useEffect(()=>{
    if(filedName =='city' && bookingData?.selectedCity){
      handleItemClickWithRedux(bookingData?.selectedCity?.name,bookingData?.selectedCity?.id)
    }
     
    if(filedName =='location' && bookingData?.selectedLocation){
      handleItemClickWithRedux(bookingData?.selectedLocation?.name,bookingData?.selectedLocation?.id)
    }
    if(filedName =='spec' && bookingData?.selectedHospitalData){
      handleItemClickWithRedux(bookingData?.selectedHospitalData?.name,bookingData?.selectedHospitalData?.id)
    }
  },[])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const filteredOptions = options.filter(option =>
    option?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      <div className="flex items-center drop">
        <input
          type="text"
          className="block w-full px-2 py-0.5 text-base text-gray-700 bg-brand placeholder-transparent placeholder:text-white focus:outline-none placeholder:text-xl"
          placeholder={placeholderVisible ? text : ""}
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={handleInputClick}
          onFocus={() => onFocus && onFocus()}
        />

        {allowClear && searchTerm ? (
          <div
            onClick={handleClearSelection}
            className="ml-2 text-white hover:text-gray-900 cursor-pointer"
          >
            <FaTimes />
          </div>
        ) : (
          <div>
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      {showDropdown && searchTerm && (
        <div
          className="dark:text-[#000000] dropdown-menu absolute right-0 z-10 mt-2 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-full"
          role="menu"
          aria-orientation="vertical"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map(option => (
                  <div
                    key={option.id}
                    className="menu-item block w-full px-4 py-2 text-sm text-left text-gray-700 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleItemClick(option.id)}
                    role="menuitem"
                    tabIndex="-1"
                  >
                    {option.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-700">
                  No Facility is available here
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;