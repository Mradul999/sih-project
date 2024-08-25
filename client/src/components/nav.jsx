import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user.slice";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("current user username",currentUser.currentUser.username);

  const [dropdown, setDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setDropdown(!dropdown);
  };

  const signoutHandler = () => {
    dispatch(signoutSuccess());
    setDropdown(false);
    navigate("/sign-in");
  };
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
          <button
            className={`px-4 py-2 ${
              currentUser.currentUser ? "hidden" : "block"
            } bg-blue-600 hover:bg-blue-700 rounded`}
          >
            Login
          </button>
        </NavLink>

        {/* Signup Button */}
        <NavLink to="/sign-up">
          <button
            className={`px-4 py-2  ${
              currentUser.currentUser ? "hidden" : "block"
            } bg-green-600 hover:bg-green-700 rounded`}
          >
            Signup
          </button>
        </NavLink>
        {currentUser.currentUser && (
          <img
            className="size-10 cursor-pointer rounded-full"
            onClick={handleDropdownToggle}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s"
          ></img>
        )}
        {dropdown && (
          <div className="flex absolute top-20 bg-slate-700 rounded-lg p-2 right-3 gap-2 flex-col">
            {currentUser?.currentUser?.username}
            <button
              onClick={signoutHandler}
              className="bg-red-600 p-2 rounded-lg"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
