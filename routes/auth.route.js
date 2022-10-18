import express from "express";
import { getRole, newRole, login, newUser } from "../controllers/index.js";

const router = express.Router();
//http://localhost:4000/api/newrole
router.post("/newrole", newRole);

router.post("/newuser", newUser);
router.get("/getroles", getRole);

router.post("/login", login);

module.exports = router;
