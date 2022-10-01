import {User,Role} from '../models/index.js';
import bcrypt from 'bcrypt';

const login = async(req,res)=>{
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
}

const newuser = async (req, res) => {
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
    

   
}

export {login,newuser}