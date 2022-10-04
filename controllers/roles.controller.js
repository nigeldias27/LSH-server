import { Form, Role } from "../models/index.js";
const getrole = async (req, res) => {
  try {
    const docs = await Role.find({});
    res.json(docs);
  } catch (error) {
    res.status(400).send(error);
  }
};
const newrole = async (req, res) => {
  console.log(req.body.name);
  const form = await Form.findOne({ formName: req.body.formName });
  const data = new Role({
    roleName: req.body.roleName,
    form: form._id,
  });
  /*
{
    "role_name": "Role B",
    "gotorole":"Role A",
    "form_inputs":[{"input":"Name of Child","type":"text","subheadings":[],"val":""},{"input":"Current Age of Child","type":"text","subheadings":[],"val":""},{"input":"Gender","type":"radio","subheadings":["Female","Male"],"val":""},{"input":"Date of Birth","type":"text","subheadings":[],"val":""},{"input":"Name of the person completing Questionnaire and relationship to child","type":"text","subheadings":[],"val":""},{"input":"Major Areas of concern and brief description of the problem","type":"text","subheadings":[],"val":""},{"input":"Have you tried to resolve the problem?What have you found to be effective","type":"text","subheadings":[],"val":""},{"input":"Has your child been treated for this problem before?","type":"radio","subheadings":["Yes","No"],"val":""},{"input":"If Yes, was it by specialist teacher, parent, psychologist, therapist? Please provide as much details as possible","type":"text","subheadings":[],"val":""},{"input":"What were the observable results from the intervention?","type":"text","subheadings":[],"val":""}]
}

*/
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getrole, newrole };
