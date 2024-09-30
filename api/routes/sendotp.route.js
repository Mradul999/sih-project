import express from "express";
import { generateOTP,sendOtpToPhonenumber, verifyOtp } from "../controllers/otp.controller.js";

const router = express.Router();
router.post("/sendotp", generateOTP);
router.post("/verifyotp", verifyOtp);

router.post("/sendotptophonenumber", sendOtpToPhonenumber);
export default router;
