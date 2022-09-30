const express = require('express');
const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router()
router.post('/newrole', async (req, res) => {
    console.log(req.body.name);
    const data = new Role({
        role_name: req.body.role_name,
        gotorole: req.body.gotorole,
        form_inputs:req.body.form_inputs
    })
/*
{
    "role_name":"Role C",
    "gotorole":"Role A",
    "form_inputs":["Address","Full Name"]
}

*/
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/newuser', async (req, res) => {
    console.log(req.body.name);
    Role.findOne({role_name:req.body.role}, (err,role)=>{
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async(err, hash) =>{
                const data = new User({
                    email: req.body.email,
                    password: hash,
                    role: role._id  
                })
                await role.updateOne({people:[...(role.people),data._id]});
                try {
                    const dataToSave = await data.save();
                    res.status(200).json(dataToSave)
                }
                catch (error) {
                    res.status(400).json({message: error.message})
                }
            });
        });
    })
    

   
})
router.get('/getroles', (req, res) => {
    Role.find({},function (err,docs){
        res.json(docs);
    })
})

router.get('/getinputs/:id',(req,res)=>{
    User.findById(req.params.id,function (err,user){
        Role.findById(user.role,function (er,role){
            res.json(role.form_inputs);
        });
    });
});

router.post('/login',async(req,res)=>{
    User.findOne({email:req.body.email},function (err,user){
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(result==true){
                res.status(200).send(user._id);
            }
            else{
                res.status(400).send("Err");
            }
        });
    });
})



module.exports = router;