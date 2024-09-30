import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { sendResetPasswordLink } from "../utils/sendResetPasswordLink.js";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const {
      name,
      phoneNo,
      password,
      role,
      pincode,
      state,
      aadhar,
      district,
      address,
      farmSize,
      khatoni,
      email,
      GST,
    } = req.body;
    // console.log("phoneNo=>",phoneNo);

    const existingUser = await User.findOne({ phoneNo });
    if (existingUser) {
      return res
        .status(403)
        .json({
          msg: "Phone number is already in use,Please use a different one",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const username =
      name.toLowerCase().replace(/\s+/g, "") +
      Math.floor(1000 + Math.random() * 9000);

    const newUser = new User({
      name,
      username,
      phoneNo,
      password: hashedPassword,
      role,
      district,
      pincode,
      state,
      aadhar,
      address,
      GST,
      email,

      farmSize,
      khatoni,
    });
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error });
  }
};

export const signin = async (req, res) => {
  try {
    const { phoneNo, password } = req.body;

    const user = await User.findOne({ phoneNo });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const cookieOptions = {
      httpOnly: true, // Makes cookie inaccessible from client-side JavaScript

      sameSite: "strict", // Helps prevent CSRF attacks
    };
    res.cookie("token", token, cookieOptions);
    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server Error" });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const userId = req.body;
    // console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getUserByState = async (req, res) => {
  try {
    const { state } = req.query; // Get the state from req.query
    // console.log(state);
    const users = await User.find({ state }); // Fetch users by state

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found with this email" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    ``;
    const resetLink = `http://localhost:5173/change-password/${token}`;
    await sendResetPasswordLink({ resetLink, email });
    res.status(200).json({
      message: "Reset password link sent to your registered email",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { password, token } = req.body;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ msg: "You can not set your old password your new password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ msg: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
