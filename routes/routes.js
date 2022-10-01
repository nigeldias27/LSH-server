import express from 'express';
import {User,Role} from '../models/index.js';
import bcrypt from 'bcrypt';
import {getrole,newrole,login,newuser,form_inputs, sendemail} from '../controllers/index.js';
const saltRounds = 10;
const router = express.Router()
router.post('/newrole', newrole);

router.post('/newuser', newuser)
router.get('/getroles', getrole)

router.get('/getinputs/:id',form_inputs);

router.post('/login',login)

router.post('/sendemail',sendemail);

module.exports = router;