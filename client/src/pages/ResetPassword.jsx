import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axios.post("/api/auth/forgotpassword", { email });
      console.log("response", response);
      if (response.status === 200) {
        setLoading(false);
        // alert("Reset password link sent successfully");
        setEmail("");
        setError("");
        setSuccess(true);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 404) {
          setError("No user found with this email");
        } else {
          setError("Internal server error");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center  items-center bg-gray-100">
      <div
        className={`max-w-[400px] w-full p-6 bg-white shadow-lg rounded-lg ${
          success && "hidden"
        } mx-2`}
      >
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Send Reset Password Link
        </h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              value={email}
              onChange={changeHandler}
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
              required
            />
          </div>
          <button
          disabled={loading===true}
            type="submit"
            className={`w-full ${loading && "cursor-not-allowed"} bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <span className="" class="loader"></span>
              </div>
            ) : (
              "Send Link"
            )}
          </button>
        </form>
      </div>
      {success && (
        <div className="max-w-[400px] w-full p-6 bg-white shadow-lg rounded-lg mx-2">
          <h1 className="text-xl font-semibold text-gray-700 mb-4">
            Reset password link sent successfully
          </h1>
          <p className="text-gray-600 mb-6">
            Please check your email and use the link to set a new password.
          </p>
          <NavLink to="/sign-in">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Sign In
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
