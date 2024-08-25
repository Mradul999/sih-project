import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, phoneNo, password, role } = req.body;
    // console.log("phoneNo=>",phoneNo);

    const existingUser = await User.findOne({ phoneNo });
    if (existingUser) {
      return res.status(403).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const username =
      firstName + lastName + Math.floor(1000 + Math.random() * 9000);

    const newUser = new User({
      firstName,
      lastName,
      username,
      phoneNo,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server Error" });
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
