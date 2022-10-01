import {Role} from '../models/index.js'
const getrole = (req, res) => {
    Role.find({},function (err,docs){
        res.json(docs);
    })
}
const newrole = async  (req, res) => {
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
}

export {getrole,newrole}