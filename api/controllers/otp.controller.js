import OTP from "../models/otp.model.js";
import User from "../models/user.model.js";
import { sendOtp } from "../utils/sendOtp.js";
import axios from "axios"

export const generateOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log("req.body=>", req.body);

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Save OTP in the database
    const newOtp = new OTP({ email, otp });
    await newOtp.save();

    // Send OTP via SMS
    await sendOtp({ email, otp });

    // Respond to the client
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error generating or sending OTP:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });

    // console.log("otp from database", otpRecord.otp);
    // console.log("otp from user", otp);

    // console.log(otpRecord);
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (parseInt(otp) !== parseInt(otpRecord.otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.json({
      message: "Error verifying OTP",
      error: error.message,
    });
  }
};

export const sendOtpToPhonenumber = async (req, res) => {
  try {
    const phoneNumber = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    await axios.get("https://www.fast2sms.com/dev/bulk", {
      params: {
        authorization: process.env.FAST2SMS_API_KEY,
        variables_values: `Your OTP is ${otp}`,
        route: "otp",
        numbers: phoneNumber,
      },
    });
    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
