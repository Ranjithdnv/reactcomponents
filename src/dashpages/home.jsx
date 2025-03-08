import React from "react";

const Home = () => {
  const recentActivities = [
    "Logged in at 10:00 AM",
    "Updated profile picture",
    "Changed password",
    "Viewed analytics dashboard",
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🏠 Welcome to the Home Page!</h2>
      <p className="text-gray-600">Here’s what’s happening:</p>
      <ul className="mt-2 list-disc pl-6">
        {recentActivities.map((activity, index) => (
          <li key={index} className="text-blue-600">
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
