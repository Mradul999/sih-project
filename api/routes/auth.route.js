import express from "express";
const router = express.Router();
import {
  changePassword,
  forgotPassword,
  getSingleUser,
  getUserByState,
  signin,
  signup,
} from "../controllers/user.controller.js";
// import { getSingleProduct } from "../controllers/product.controller.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/getsingleuser", getSingleUser);
router.get("/getbystate", getUserByState);
router.post("/forgotpassword", forgotPassword);

router.post("/changePassword",changePassword);



export default router;
