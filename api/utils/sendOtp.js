import nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtp = async ({ email, otp }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
      html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("OTP sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending OTP", error);
    throw new Error(error);
  }
};
