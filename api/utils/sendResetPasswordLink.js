import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetPasswordLink = async ({ resetLink, email }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password Link",
      html: `
        <h1>Reset Password Link</h1>
        <p>Click on the following link to reset your password: <a href="${resetLink}">Reset Password</a></p>
        `,
    };

    const info=await transporter.sendMail(mailOptions);
    console.log("Reset password link sent successfully:", info.response);

  } catch (error) {
    console.error("Error sending reset password link", error);
    throw new Error(error);
  }
};
