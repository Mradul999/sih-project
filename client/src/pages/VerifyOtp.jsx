import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import CompleteProfile from "./CompleteProfile";

const VerifyOtp = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState("");
  const [timer, setTimer] = useState(30); // Timer state
  const [isResendEnabled, setIsResendEnabled] = useState(false); // Resend button state
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData(e.target.value);
  };

  const email = sessionStorage.getItem("email");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await axios.post("/api/otp/verifyotp", {
        otp: formData,
        email,
      });

      if (response.status === 200) {
        setLoading(false);
        toast.success("OTP verified successfully");

        navigate("/complete-profile");
        setOtpVerified(true);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Invalid OTP.");
          return;
        } else {
          toast.error("Internal Server Error");
          return;
        }
      }
    }
  };

  const resendHandler = async () => {
    console.log("Resend OTP");

    setIsResendEnabled(false);
    try {
      const response = await axios.post("/api/otp/sendotp", { email: email });
      if (response.status === 200) {
        toast.success("OTP send successfully");
        setTimer(30);
      }
    } catch (error) {
      alert("Error");
    }
  };

  useEffect(() => {
    if (timer === 0) {
      setIsResendEnabled(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="min-h-screen pb-10 pt-20 flex justify-center items-center bg-green-50">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full flex">
        <div className="w-1/2 p-8 bg-green-600">
          <h1 className="text-3xl font-bold text-white mb-6">KrishiHal</h1>
          <img
            src="farmer2.jpeg"
            alt="Farmer in field"
            className=" rounded-md opacity-80 h-48 object-cover w-full my-2 "
          />
          <p className="text-green-100 text-lg">
          Join FarmConnect and revolutionize your farming experience. Access cutting-edge
            agricultural insights, connect with experts, and grow your business sustainably.
            Start your journey to smarter farming today!
          </p>
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">
            Verify Your Email
          </h2>
          <p className="text-gray-600 mb-4 text-center">
            Enter the 6-digit code sent to: <strong>{email}</strong>
          </p>
          <form
            className="flex flex-col gap-4 items-center mb-6"
            onSubmit={submitHandler}
          >
            <input
              onChange={changeHandler}
              type="text"
              placeholder="Enter OTP"
              maxLength="6"
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-lg"
            />
            <button
              className={`w-full py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
                formData.length === 6
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-300 cursor-not-allowed"
              } ${loading && "cursor-not-allowed"}`}
              type="submit"
              disabled={formData.length !== 6 || loading === true}
            >
              {loading ? (
                <span className="loader border-t-2 border-white rounded-full w-5 h-5 inline-block animate-spin"></span>
              ) : (
                "Verify"
              )}
            </button>
          </form>

          <div className="text-center">
            <button
              className={`w-full py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
                isResendEnabled
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-300 cursor-not-allowed"
              }`}
              onClick={resendHandler}
              disabled={!isResendEnabled}
            >
              {isResendEnabled ? "Resend Code" : `Resend Code (${timer}s)`}
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default VerifyOtp;
