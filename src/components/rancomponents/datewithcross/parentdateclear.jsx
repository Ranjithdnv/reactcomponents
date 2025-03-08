import React, { useState } from "react";
import CustomDatePicker from "./datecros";

const Parentdateclear = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateUpdate = (date) => {
    setSelectedDate(date); // Update state in parent
    console.log(date);
  };

  const handleDateUpdate2 = () => {
    console.log("hiippppppppppppppppppppppppppppppppppp");
  };

  return (
    <div className="p-4">
      <h2 className="mb-2">Select a Date:</h2>
      <CustomDatePicker
        value={selectedDate}
        onDateChange={handleDateUpdate}
        handleDateUpdate2={handleDateUpdate2}
      />
    </div>
  );
};

export default Parentdateclear;

// import React, { useState } from "react";
// import CustomDatePicker from "./datecros";

// const Parentdateclear = () => {
//   const [message, setMessage] = useState("Hello from Parent");

//   // Function to update message
//   const updateMessage = (newMessage) => {
//     setMessage(newMessage);
//   };

//   return (
//     <div className="p-4 border rounded-md shadow-md">
//       <h2>Parent Component</h2>
//       <p>Message: {message}</p>

//       {/* Passing function to child */}
//       <CustomDatePicker onUpdateMessage={updateMessage} />
//     </div>
//   );
// };

// export default Parentdateclear;
