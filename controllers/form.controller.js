import {User,Role} from '../models/index.js'


const form_inputs = (req,res)=>{
    User.findById(req.params.id,function (err,user){
        Role.findById(user.role,function (er,role){
            res.json(role.form_inputs);
        });
    });
}

const sendemail = async(req,res)=>{
    Role.findOne({role_name:req.body.gotorole},function(err,role){
        var rolearr = role.people;
        for (let i = 0; i < rolearr.length; i++) {
            const element = rolearr[i];
            User.findById(element,(err,users)=>{
               // users.email
                //TODO: Send email to people which have the same role as the gotorole with the incoming form data

            })
        }
    })
}

export {form_inputs,sendemail}