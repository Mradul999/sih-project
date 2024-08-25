import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {/* Left side: Logo */}
      <div className="flex items-center">
        <div className="font-bold text-lg cursor-pointer">Logo</div>
      </div>

      {/* Center: Navigation Links */}
      <ul className="flex space-x-6">
        <li>
          <NavLink
            exact
            to="/"
            className="cursor-pointer hover:text-gray-400"
            activeClassName="text-blue-400"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className="cursor-pointer hover:text-gray-400"
            activeClassName="text-blue-400"
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className="cursor-pointer hover:text-gray-400"
            activeClassName="text-blue-400"
          >
            Contact Us
          </NavLink>
        </li>
      </ul>

      {/* Right side: Search Icon, Login, and Signup */}
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        <div className="cursor-pointer hover:text-gray-400">
          <i className="fas fa-search"></i> {/* Font Awesome Icon */}
        </div>

        {/* Login Button */}
        <NavLink to="/sign-in">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded">
            Login
          </button>
        </NavLink>

        {/* Signup Button */}
        <NavLink to="/sign-up">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded">
            Signup
          </button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
