import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useState } from "react";

const Signin = () => {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  // console.log(formData);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/signin", formData);
      if (response.status == 201) {
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
    <div class="bg-gray-100 flex items-center justify-center h-screen">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={submitHandler}>
          <div class="mb-4">
            <label for="phone" class="block text-gray-700 font-semibold mb-2">
              Phone Number
            </label>
            <input
              onChange={changeHandler}
              type="tel"
              id="phoneNo"
              name="phoneNo"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              onChange={changeHandler}
              type="password"
              id="password"
              name="password"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
