import express from "express";
import { formInputs, newQues, newForm, submit } from "../controllers/index.js";
import { authenticateToken } from "../middlewares/index.js";

const router = express.Router();
//http://localhost:4000/api/newrole

router.get("/getinputs/:submissionId", authenticateToken, formInputs);

router.post("/newquestion", newQues);

router.post("/newform", newForm);

router.post("/submission/:submissionId", authenticateToken, submit);
module.exports = router;
