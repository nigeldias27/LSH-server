import express from "express";
import {
  getrole,
  newrole,
  login,
  newuser,
  form_inputs,
  sendemail,
  newques,
  newform,
  submit,
} from "../controllers/index.js";
import { authenticatetoken } from "../middlewares/index.js";

const router = express.Router();
//http://localhost:4000/api/newrole
router.post("/newrole", newrole);

router.post("/newuser", newuser);
router.get("/getroles", getrole);

router.get("/getinputs", authenticatetoken, form_inputs);

router.post("/login", login);

router.post("/sendemail", sendemail);

router.post("/newquestion", newques);

router.post("/newform", newform);

router.post("/submission", authenticatetoken, submit);
module.exports = router;
