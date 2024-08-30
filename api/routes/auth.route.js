import express from "express";
const router = express.Router();
import { getSingleUser, getUserByState, signin, signup } from "../controllers/user.controller.js";
// import { getSingleProduct } from "../controllers/product.controller.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/getsingleuser",getSingleUser );
router.get("/getbystate",getUserByState);

export default router;
