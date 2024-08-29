import express from "express";
import {
  addProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

router.post("/addproduct", addProduct);
router.get("/getallproducts", getAllProducts);
router.get("/getsingleproduct", getSingleProduct);

export default router;
