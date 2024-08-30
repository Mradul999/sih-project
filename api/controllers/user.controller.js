import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
    } = req.body;
    // console.log("phoneNo=>",phoneNo);

    const existingUser = await User.findOne({ phoneNo });
    if (existingUser) {
      return res.status(403).json({ msg: "User already exists" });
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
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server Error" });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const  userId  = req.body;
    console.log(userId);
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
