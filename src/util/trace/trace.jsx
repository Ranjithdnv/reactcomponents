import React, { useState, useEffect, useRef } from "react";

const logDebug = (message, data = {}) => {
  console.debug(`🐞 [DEBUG] ${message}`, data);
};

const logTable = (data) => {
  console.table(data);
};

const logDeviceInfo = () => {
  const deviceInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    screen: `${window.screen.width}x${window.screen.height}`,
  };
  logDebug("Device Information", deviceInfo);
};

// const logStateChange = (prevState, currentState) => {
//   console.groupCollapsed("🔄 [STATE CHANGE]");

//   const changes = {};

//   Object.keys(currentState).forEach((key) => {
//     if (JSON.stringify(prevState[key]) !== JSON.stringify(currentState[key])) {
//       changes[key] = `%c 🔺 ${JSON.stringify(currentState[key])}`;
//     } else {
//       changes[key] = JSON.stringify(currentState[key]);
//     }
//   });

//   console.table({
//     Previous: prevState,
//     Current: currentState,
//     Changes: changes,
//   });
//   console.groupEnd();
// };

const logBatteryStatus = async () => {
  if (!navigator.getBattery) {
    logDebug("Battery API not supported");
    return;
  }
  const battery = await navigator.getBattery();
  logDebug("Battery Status", {
    level: `${battery.level * 100}%`,
    charging: battery.charging ? "Yes" : "No",
  });
};

const LoggerComponent = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [buttonClicks, setButtonClicks] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [fetchdataRelativeInfo, setFetchDataRelativeInfo] = useState(false);

  const prevStates = useRef([]);

  const allStates = [pageIndex, fetchdataRelativeInfo, inputs, buttonClicks];
  const allStatesnames = [
    "pageIndex",
    "fetchdataRelativeInfo",
    "inputs",
    "buttonClicks",
  ];
  useEffect(() => {
    allStates.forEach((currentState, index) => {
      let prevState = prevStates.current[index];

      if (
        prevState !== undefined &&
        JSON.stringify(prevState) !== JSON.stringify(currentState)
      ) {
        console.log(`State changed:   ${allStatesnames[index]}`);
        console.log("Previous state:", prevState);
        console.log("New state:", currentState);
      }
    });

    prevStates.current = [...allStates]; // ✅ Corrected
  }, [pageIndex, fetchdataRelativeInfo, inputs, buttonClicks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 space-y-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-semibold">Logger Component</h2>

      <div className="space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={inputs.name}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={inputs.email}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
        <textarea
          name="message"
          placeholder="Enter Message"
          value={inputs.message}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full"
        />
      </div>

      <p>Button Clicks: {buttonClicks}</p>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => setButtonClicks((prev) => prev + 1)}
      >
        Click Me
      </button>

      <button
        className="px-4 py-2 bg-gray-500 text-white rounded-md"
        onClick={logDeviceInfo}
      >
        Log Device Info
      </button>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md"
        onClick={logBatteryStatus}
      >
        Log Battery Status
      </button>
    </div>
  );
};

export default LoggerComponent;
