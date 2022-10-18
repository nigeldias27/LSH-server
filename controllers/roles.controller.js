import { Role } from "../models/index.js";

export const getRole = async (req, res) => {
  try {
    const docs = await Role.find({});
    res.json(docs);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const newRole = async (req, res) => {
  //const form = await Form.findOne({ formName: req.body.formName });
  const data = new Role({
    roleName: req.body.roleName,
    //form: form._id,
  });
  /*
{
    "roleName": "Role B"
}

*/
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
