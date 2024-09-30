import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user.slice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { Menu, X, Leaf } from "lucide-react";

const Nav = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log("currentUser", currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // console.log("current user username",currentUser.currentUser.username);

  const [dropdown, setDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setDropdown(!dropdown);
  };

  const signoutHandler = () => {
    dispatch(signoutSuccess());
    setDropdown(false);
    sessionStorage.removeItem("verified");

    navigate("/sign-in");
  };
  return (
    <nav className="w-full z-10" style={{ backgroundColor: '#F7FBFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and website name */}
          <div className="flex-shrink-0 flex items-center">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-black text-2xl font-bold">
              KrishiHal
            </span>
          </div>

          {/* Navigation links - hidden on mobile */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline text-black space-x-4">
              <NavLink
                to="/"
                className="  hover:bg-emerald-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300"
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="  hover:bg-emerald-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300"
              >
                About Us
              </NavLink>
              <NavLink
                to="/all-products"
                className="  hover:bg-emerald-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300"
              >
                MarketPlace
              </NavLink>
              <NavLink
                to="/contract-farming"
                className="  hover:bg-emerald-500 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300"
              >
                Contract Farming
              </NavLink>
            </div>
          </div>

          {/* Sign up and Sign in buttons - hidden on mobile */}

          {currentUser ? (
            <div
              className="relative cursor-pointer    "
              onClick={handleDropdownToggle}
            >
              <img
                src={
                  currentUser.role === "farmer"
                    ? "https://th.bing.com/th/id/OIP.hY4xrBovZC-zqwAV0_Gs-gHaHa?rs=1&pid=ImgDetMain"
                    : "https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
                }
                className="size-10 rounded-full"
                alt="Profile"
              />

              {dropdown && (
                <div className="absolute min-w-[230px] w-full right-0 top-full mt-2 z-10 bg-white rounded-md shadow-md">
                  <div className="p-4">
                    <div className="flex items-center">
                      <img
                        src={
                          currentUser.role === "farmer"
                            ? "https://th.bing.com/th/id/OIP.hY4xrBovZC-zqwAV0_Gs-gHaHa?rs=1&pid=ImgDetMain"
                            : "https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
                        }
                        alt="Profile Image"
                        className="h-10 w-10 rounded-full mr-2"
                      />
                      <div>
                        <h2 className="text-lg  font-semibold">
                          {currentUser.username}
                        </h2>
                        <p className="text-gray-500">{currentUser.role}</p>
                      </div>
                    </div>

                    <hr className="my-1" />

                    <div className="flex flex-col space-y-2">
                      <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100">
                        Contact Us
                      </button>
                      <NavLink to="/user-profile">
                        <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100">
                          Update Profile
                        </button>
                      </NavLink>

                      <hr className="my-1" />

                      <button
                        onClick={signoutHandler}
                        className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={`hidden md:block  `}>
              <NavLink to="/sign-up">
                <button className="bg-white text-emerald-600 hover:bg-emerald-100 px-4 py-2 rounded-md text-sm font-medium mr-2 transition duration-300">
                  Sign Up
                </button>
              </NavLink>

              <NavLink to="/sign-in">
                <button className="bg-emerald-700 text-white hover:bg-emerald-800 px-4 py-2 rounded-md text-sm font-medium transition duration-300">
                  Sign In
                </button>
              </NavLink>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className="text-white hover:bg-emerald-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="text-white hover:bg-emerald-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              About Us
            </NavLink>
            <NavLink
              to="/all-products"
              className="text-white hover:bg-emerald-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              Market Place
            </NavLink>
            <NavLink
              to="/contract-farming"
              className="text-white hover:bg-emerald-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              Contract Farming
            </NavLink>
          </div>
          {!currentUser && (
            <div className="pt-4 pb-3 border-t border-emerald-500">
              <div className="flex items-center px-5">
                <button className="bg-white text-emerald-600 hover:bg-emerald-100 block px-3 py-2 rounded-md text-base font-medium mr-2">
                  Sign Up
                </button>
                <button className="bg-emerald-700 text-white hover:bg-emerald-800 block px-3 py-2 rounded-md text-base font-medium">
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
