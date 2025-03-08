import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({
  label,
  icon,
  format = "yyyy-MM-dd",
  placeholder = "Select date",
  name,
  error,
  required = true,
  maxDate,
  value,
  disable,
  dateFormat,
  onDateChange,
  newDesign,
  cls = "",
  ...otherProps
}) => {
  const [open, setOpen] = useState(false);
  const datepickerRef = useRef(null);

  // const handleDivClick = () => {
  //   if (datepickerRef.current && !disable) {
  //     datepickerRef.current.setFocus();
  //   }
  // };

  const getValidDate = (date) => {
    if (!date) return null;
    const parsedDate = new Date(date);
    return parsedDate.getTime() ? parsedDate : null;
  };

  return (
    <div>
      <label
        htmlFor={name + "-field"}
        className={`flex ${
          newDesign ? "text-xl ml-4" : "text-sm"
        }   leading-6 text-[#000000e0] dark:text-gray-300 font-display font-semibold`}
      >
        <span className={cls}> {label} </span>
        {required && <span className="text-[#e94a4a] ml-0.5 text-lg">*</span>}
      </label>

      <div
        className={`relative border px-0.5 w-full mt-1 ${
          newDesign
            ? "rounded-full border border-[2px]  shadow-lg border-[#04816A] "
            : "rounded-md"
        } transition duration-150 ease-in-out ${
          error
            ? "border-[#e94a4a] focus-within:ring-2 focus-within:ring-[#e94a4a]"
            : "border-[#ced4da] hover:border-[#04816A] focus-within:ring-2 focus-within:ring-[#04816A] dark:focus-within:ring-[#00bfa5]"
        } ${disable ? "bg-[#fafafa] cursor-not-allowed" : "bg-[#ffffff]"}`}
        onClick={() => {
          if (!disable) setOpen(true);
        }}
      >
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        <DatePicker
          ref={datepickerRef}
          className={`block w-full  ${
            newDesign ? "rounded-full" : "rounded-md"
          } px-3 py-2 text-[#404040] dark:text-[#404040] placeholder-[#bfbfbf] dark:placeholder-[#525252] border-none focus:outline-none 
            ${icon ? "pl-10" : ""} ${
            disable
              ? "bg-[#fafafa] cursor-not-allowed"
              : "bg-[#ffffff] dark:bg-[#ffffff]"
          }`}
          name={name}
          id={name + "-field"}
          required={required}
          disabled={disable}
          maxDate={maxDate}
          selected={getValidDate(value)}
          onChange={(date) => {
            onDateChange(date);
            setOpen(false);
          }}
          placeholderText={placeholder}
          dateFormat={format}
          onCalendarClose={() => setOpen(false)}
          open={open}
          onClickOutside={() => setOpen(false)}
          popperPlacement="bottom-start"
          popperClassName="custom-datepicker"
          showMonthDropdown
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={150}
          onKeyDown={(e) => e.preventDefault()}
          {...otherProps}
        />
        {/* {value && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-red-500 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation(); // ✅ Prevents opening calendar
              if (onDateChange) {
                onDateChange(null); // ✅ Correctly clears the selected date
              }
            }}
          >
            ✕
          </button>
        )} */}
      </div>
      {error && <span className="text-[#e94a4a] text-sm mt-1">{error}</span>}
    </div>
  );
};

export default DatePickerField;
