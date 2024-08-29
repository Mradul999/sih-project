import express from "express";
import {
  acceptContract,
  createContract,
  getAllContracts,
  getSingleContract,
} from "../controllers/contract.controller.js";

const router = express.Router();

router.post("/createcontract", createContract);
router.post("/acceptcontract", acceptContract);
router.get("/getallcontracts",getAllContracts)
router.get("/getsinglecontract",getSingleContract);

export default router;
