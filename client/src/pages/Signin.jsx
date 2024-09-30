import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signinSuccess } from "../redux/user.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

import { useEffect } from "react";


import AOS from "aos";
import "aos/dist/aos.css";


const Signin = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Optional: easing type
      once: false, // Animation only happens once when scrolled into view
    });
  }, []);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // console.log(formData);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/signin", formData);
      if (response.status == 201) {
        // console.log("response", response);
        toast.success("Signed in successfully");

        dispatch(signinSuccess(response.data.user));

        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("User does not exist please register first");
          navigate("/sign-up");
        } else if (error.response.status === 401) {
          alert("Invalid credentials");
        } else {
          alert("An error occurred");
        }
      }
    }
  };

  return (
    <div className="flex items-center pt-20 pb-10  justify-center min-h-screen bg-green-50">
      <div data-aos="fade-up" className="flex  w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="flex gap-2 flex-col justify-center w-1/2 p-12 bg-green-600">
          <h1 className="text-4xl font-bold text-white mb-4">KrishiHal</h1>
          <img src="farmer.jpeg" className="rounded-md opacity-75" alt="" />
          <p className="text-green-100 text-lg">
            Empowering farmers with innovative solutions. Join our community to
            access cutting-edge farming techniques, connect with experts, and
            grow your agricultural business.
          </p>
        </div>
        <div className="w-1/2 p-12">
          <h2 className="text-3xl font-bold mb-6 text-green-800">Login</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                htmlFor="phoneNo"
                className="block text-green-700 font-semibold mb-2"
              >
                Phone Number
              </label>
              <input
                onChange={changeHandler}
                type="tel"
                id="phoneNo"
                name="phoneNo"
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-green-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                onChange={changeHandler}
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
            >
              Login
            </button>
            <div className="mt-4 text-center">
              <NavLink
                to="/reset-password"
                className="text-green-600 hover:text-green-800 transition-all"
              >
                Forgot Password?
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Signin;
