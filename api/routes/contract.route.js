import express from "express";
import {
  acceptContract,
  createContract,
  getAllContracts,
} from "../controllers/contract.controller.js";

const router = express.Router();

router.post("/createcontract", createContract);
router.post("/acceptcontract", acceptContract);
router.get("/getallcontracts",getAllContracts)

export default router;
