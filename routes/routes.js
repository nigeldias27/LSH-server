import express from "express";
import { User, Role } from "../models/index.js";
import bcrypt from "bcrypt";
import {
  getrole,
  newrole,
  login,
  newuser,
  form_inputs,
  sendemail,
  newques,
  newform,
} from "../controllers/index.js";
import { authenticatetoken } from "../middlewares/index.js";

const router = express.Router();
router.post("/newrole", newrole);

router.post("/newuser", newuser);
router.get("/getroles", getrole);

router.get("/getinputs", authenticatetoken, form_inputs);

router.post("/login", login);

router.post("/sendemail", sendemail);

router.post("/newquestion", newques);

router.post("/newform", newform);

module.exports = router;
