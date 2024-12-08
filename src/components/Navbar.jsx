import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [role, setRole] = useState("");
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    // Fetch role from localStorage
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  return (
    <nav className="bg-violet-800 text-white px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold">MaxHelp</h1>

        {/* Desktop Navigation Links */}
        {/* <ul className="hidden md:flex space-x-6 text-lg">
          <li>
            <a href="/business" className="hover:text-violet-300 transition-colors duration-200">
              Home
            </a>
          </li>
          <li>
            <a href="/profile" className="hover:text-violet-300 transition-colors duration-200">
              Profile
            </a>
          </li>
          <li>
            <a href="/" className="hover:text-violet-300 transition-colors duration-200">
              Logout
            </a>
          </li>
        </ul> */}
        <div className="">
          <ul className="flex">
            <li>
              <a
                href="/business"
                className="block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
              >
                Home
              </a>
            </li>

            {/* Business Unit Selector */}
            {/* <li>
              <a
                href="/business"
                className="block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
              >
                Business Unit Selector
              </a>
            </li> */}

            {/* Dashboard - for User and Admin */}
            {(role === "user" || role === "admin") && (
              <li>
                <a
                  href="/dashboard"
                  className="block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Dashboard
                </a>
              </li>
            )}

            {/* Inventory - for User and Admin */}
            {(role === "user" || role === "admin") && (
              <li>
                <a
                  href="/inventory"
                  className="block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Inventory
                </a>
              </li>
            )}

            {/* Sales - for User and Admin */}
            {(role === "user" || role === "admin") && (
              <li>
                <a
                  href="/sales"
                  className="block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Sales
                </a>
              </li>
            )}

            {/* Feedback - for Customer, User, and Admin */}
            {(role === "user" || role === "admin" || role === "customer") && (
              <li>
                <a
                  href="/feedback"
                  className="block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Feedback
                </a>
              </li>
            )}

            {/* Create User - for Admin only */}
            {role === "admin" && (
              <li>
                <a
                  href="/create-user"
                  className="block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Create User
                </a>
              </li>
            )}

            <li>
              <a
                href="/profile"
                className="block hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
              >
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-violet-800 text-white p-4">
          <ul className="space-y-4 text-lg">
            <li>
              <a
                href="/business"
                className="hover:text-violet-300 transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="hover:text-violet-300 transition-colors duration-200"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="/"
                className="hover:text-violet-300 transition-colors duration-200"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
