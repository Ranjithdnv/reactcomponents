import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import ThemeToggle from "../dashpages/toogle";
import { ThemeContext } from "../util/themecontext";

const DashboardLayout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`h-screenz flex flex-col transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {" "}
      <div className="h-screen flex flex-col">
        {/* Fixed Top Navigation */}
        <nav className="bg-blue-600 text-white p-4 fixed top-0 left-0 w-full shadow-md">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <div className="mt-2 space-x-4">
            <Link to="/" className="px-3 py-1 bg-white text-blue-600 rounded">
              Home
            </Link>
            <Link
              to="/profile"
              className="px-3 py-1 bg-white text-blue-600 rounded"
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="px-3 py-1 bg-white text-blue-600 rounded"
            >
              Settings
            </Link>
            <ThemeToggle></ThemeToggle>
          </div>
        </nav>

        {/* Page Content (below the fixed nav) */}
        <div className="mt-16 p-4">
          <Outlet /> {/* This renders the current route component */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
