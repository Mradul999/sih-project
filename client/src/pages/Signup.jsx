import axios from "axios";
import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";



import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

const Signup = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Optional: easing type
      once: false, // Animation only happens once when scrolled into view
    });
  }, []);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const changeHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/otp/sendotp", { email });
      if (response.status == 200) {
        toast.success("OTP send successfully");
        sessionStorage.setItem("email", email);

        navigate("/verify-otp");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Email already registered");
        } else {
          toast.error("Internal server error");
        }
      }
    }
  };
  return (
    <div data-aos="fade-up" className="flex items-center pt-20 pb-10 justify-center  min-h-screen bg-green-50">
      <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="w-1/2 p-12 bg-green-600">
          <h1 className="text-4xl font-bold text-white mb-6">KrishiHal</h1>
          <img
            src="farmer2.jpeg"
            alt="Farmer in field"
            className=" rounded-md opacity-80 h-48 object-cover w-full my-2 "
          />
          <p className="text-green-100 text-md">
            Join FarmConnect and revolutionize your farming experience. Access cutting-edge
            agricultural insights, connect with experts, and grow your business sustainably.
            Start your journey to smarter farming today!
          </p>
        </div>
        <div className="w-1/2 p-12">
          <h2 className="text-3xl font-bold mb-6 text-green-800">Get Started</h2>
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-green-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                onChange={changeHandler}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out font-semibold"
            >
              Send Verification Code
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="#" className="font-medium text-green-600 hover:text-green-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
