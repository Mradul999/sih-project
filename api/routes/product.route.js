import express from "express";
import {
  addProduct,
  getAllProducts,
} from "../controllers/product.controller.js";
const router = express.Router();

router.post("/addproduct", addProduct);
router.get("/getallproducts", getAllProducts);

export default router;
