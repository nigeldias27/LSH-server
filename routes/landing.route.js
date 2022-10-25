import express from "express";
import {
  completedForms,
  createForm,
  getUserInfo,
  pendingForms,
} from "../controllers/index.js";
import { authenticateToken } from "../middlewares/index.js";
const router = express.Router();

router.get("/pendingForms", authenticateToken, pendingForms);

router.get("/completedForms", authenticateToken, completedForms);

router.get("/getUserInfo/:userId", authenticateToken, getUserInfo);

router.get("/createForm", authenticateToken, createForm);
module.exports = router;
