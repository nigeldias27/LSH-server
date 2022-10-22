import express from "express";
import { pendingForms } from "../controllers/index.js";
import { authenticateToken } from "../middlewares/index.js";
const router = express.Router();

router.get("/pendingForms", authenticateToken, pendingForms);

router.get("/completedForms", authenticateToken, pendingForms);

module.exports = router;
