import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full bg-gray-900 text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">
          <Link to="/">Admin Dashboard</Link>
        </h1>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/profile" className="hover:text-gray-300">
            Profile
          </Link>
          <Link to="/settings" className="hover:text-gray-300">
            Settings
          </Link>
          <Link to="/shanco" className="hover:text-gray-300">
            Shanco
          </Link>
        </nav>

        {/* User Profile / Logout (Placeholder) */}
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
