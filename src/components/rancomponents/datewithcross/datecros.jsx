import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  differenceInYears,
} from "date-fns";

import { isBefore, isAfter, isToday, isFuture, isPast } from "date-fns";

import { addHours, addMinutes, addSeconds } from "date-fns";
import { startOfWeek, nextMonday } from "date-fns";

const CustomDatePicker = ({ value, onDateChange, handleDateUpdate2 }) => {
  const [selectedDate, setSelectedDate] = useState(value);

  useEffect(() => {
    setSelectedDate(value);
    handleDateUpdate2("hoooooooooooooooo");
  }, [value]);
  console.log("new dateeeeeeeeeeeeeeee", new Date());
  console.log("new dae yyyyyyyyyyyyyyyyy", format(new Date(), "yyyy-MM-dd")); // 2025-02-28
  console.log(addDays(new Date(), 5));
  console.log(format(addDays(new Date(), 5), "yyyy-MM-dd"));
  // Adds 5 days
  console.log(format(new Date(), "EEEE, MMMM do, yyyy"));

  console.log(format(new Date(), "EEEE")); // Friday (Day Name)
  console.log(format(new Date(), "MMMM")); // February (Month Name)

  console.log(addHours(new Date(), 5)); // Adds 5 hours
  console.log(addMinutes(new Date(), 30)); // Adds 30 minutes
  console.log(addSeconds(new Date(), 45)); // Adds 45 seconds

  console.log(format(new Date(), "EEEE, do, MMMM, yyyy")); // Friday, February 28th, 2025
  console.log(format(new Date(), "hh:mm a")); // 02:30 PM

  console.log("Start of Month:", startOfMonth(new Date())); // 2025-02-01 00:00:00
  console.log("End of Month:", endOfMonth(new Date())); // 2025-02-28 23:59:59

  console.log(
    differenceInYears(new Date("2030-01-01"), new Date("2025-01-01"))
  ); // 5
  console.log("Start of This Week:", startOfWeek(new Date())); // Sunday of this week
  console.log("Next Monday:", nextMonday(new Date())); // Next Monday's date

  console.log(isBefore(new Date("2025-02-28"), new Date("2025-03-10"))); // true
  console.log(isAfter(new Date("2025-03-10"), new Date("2025-02-28"))); // true

  console.log(isToday(new Date())); // true (if today is 2025-02-28)
  console.log(isFuture(new Date("2026-01-01"))); // true
  console.log(isPast(new Date("2024-01-01"))); // true

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
    if (onDateChange) onDateChange(date);
  };

  return (
    <div className="relative flex text-center items-center p-2 w-full">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        isClearable
        placeholderText="Select a date"
        className="border border-gray-300 p-2 rounded-md w-full focus:outline-none shadow-md"
        popperClassName="shadow-lg border rounded-md"
        // onCalendarClose={() => setOpen(false)}
        // onClickOutside={() => setOpen(false)}
        //   maxDate={}
        popperPlacement="bottom-start"
        showMonthDropdown
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={150}
        onKeyDown={(e) => e.preventDefault()}
      />

      {selectedDate && (
        <button
          className="absolute right-3 text-red-500 text-lg font-bold bg-transparent hover:text-red-700"
          onClick={() => handleDateChange(null)}
        >
          ❌
        </button>
      )}
    </div>
  );
};

export default CustomDatePicker;

// import React from "react";

// const CustomDatePicker = ({ onUpdateMessage }) => {
//   return (
//     <div className="mt-4 p-4 border rounded-md shadow-md">
//       <h3>Child Component</h3>
//       <button
//         className="px-4 py-2 bg-blue-500 text-white rounded-md"
//         onClick={() => onUpdateMessage("Message updated by Child!")}
//       >
//         Update Parent Message
//       </button>
//     </div>
//   );
// };

// export default CustomDatePicker;
