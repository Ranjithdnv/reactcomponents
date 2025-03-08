import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Web developer and tech enthusiast",
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>

      {/* Profile Information */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Bio:</strong> {user.bio}
        </p>
        <button
          onClick={() => alert("Edit Profile Clicked!")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Edit Profile
        </button>
      </div>

      {/* Nested Navigation */}
      <nav className="mt-4">
        <Link
          to="details"
          className="px-3 py-1 bg-blue-500 text-white rounded mx-2"
        >
          Profile Details
        </Link>
        <Link
          to="settings"
          className="px-3 py-1 bg-green-500 text-white rounded mx-2"
        >
          Profile Settings
        </Link>
      </nav>

      {/* Render Nested Routes Here */}
      <div className="mt-4 p-4 border rounded">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
