import logo from '../assets/images/medLogo.png';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdLogin } from 'react-icons/md';
import React from 'react';

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  const navLinks = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Specializations',
      path: '/specializations',
    },
    {
      label: 'Book an Appointment',
      path: '/doctors',
    },
    // {
    //   label: 'About',
    //   path: '/about',
    // },
  ];

  return (
    <header className="bg-white py-3 fixed w-full top-0 z-50 shadow-lg  rounded-b-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="MedFidelity Logo" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:text-[#7C3AED]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/bookdemo"
            className="bg-[#3c00be] text-white px-5 py-2 rounded-[28px] text-[14px] font-medium hover:bg-[#7C3AED] transition-all duration-300"
          >
            Book a Demo
          </Link>
          <div className="relative inline-block">
            {/* <button
              className="bg-[#04816A] text-white px-6 py-2 rounded-[8px] text-[14px] font-medium hover:bg-[#45a049] transition-all duration-300 flex items-center min-w-[120px] justify-between"
              onClick={() => setShowLoginDropdown(!showLoginDropdown)}
              onBlur={() => setTimeout(() => setShowLoginDropdown(false), 200)}
            >
              Log in
              <svg
                className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${showLoginDropdown ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button> */}
            <Link
              to="/login"
              className="bg-[#04816A] text-white px-6 py-2 rounded-[8px] text-[14px] font-medium hover:bg-[#45a049] transition-all duration-300 flex items-center min-w-[120px] justify-between"
            >
              Login
              <MdLogin className="w-5 h-5" />
            </Link>
            {/* Login Dropdown */}
            {showLoginDropdown && (
              <div className="absolute left-0 mt-1 min-w-[120px] w-full bg-white rounded-lg shadow-lg py-1 z-50">
                <Link
                  to="/login/staff"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                  onClick={() => setShowLoginDropdown(false)}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Staff Login
                </Link>
                <Link
                  to="/login/patient"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                  onClick={() => setShowLoginDropdown(false)}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M18 21C18 17.134 15.866 15 12 15C8.13401 15 6 17.134 6 21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Patient Login
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 p-4 md:hidden shadow-lg">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/bookdemo"
                className="bg-[#8B5CF6] text-white px-5 py-2 rounded-[28px] text-[14px] font-medium hover:bg-[#7C3AED] transition-all duration-300 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a Demo
              </Link>
              <div className="relative w-full">
                {/* <button
                  className="bg-[#4CAF50] text-white px-6 py-2 rounded-[8px] text-[14px] font-medium hover:bg-[#45a049] transition-all duration-300 w-full flex items-center justify-center"
                  onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                >
                  Log in
                  <svg
                    className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${showLoginDropdown ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button> */}

                <Link
                  to="/login"
                  className="bg-[#4CAF50] text-white px-6 py-2 rounded-[8px] text-[14px] font-medium hover:bg-[#45a049] transition-all duration-300 w-full flex items-center justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                  <MdLogin className="w-5 h-5 ml-5" />
                </Link>

                {/* Mobile Login Dropdown */}
                {showLoginDropdown && (
                  <div className="mt-2 w-full bg-white rounded-lg shadow-lg py-1">
                    <Link
                      to="/login/staff"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        setShowLoginDropdown(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Staff Login
                    </Link>
                    <Link
                      to="/login/patient"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => {
                        setShowLoginDropdown(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M18 21C18 17.134 15.866 15 12 15C8.13401 15 6 17.134 6 21"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Patient Login
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
