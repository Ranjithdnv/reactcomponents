import React, { useState } from "react";

const Content = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">⚙️ Settings</h2>

      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium">Enable Dark Mode:</label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="w-5 h-5"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="font-medium">Enable Notifications:</label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
          className="w-5 h-5"
        />
      </div>

      <p className="mt-4">
        {darkMode ? "🌙 Dark mode is ON" : "☀️ Light mode is ON"}
      </p>
      <p>
        {notifications
          ? "🔔 Notifications are ENABLED"
          : "🔕 Notifications are DISABLED"}
      </p>
    </div>
  );
};

export default Content;
