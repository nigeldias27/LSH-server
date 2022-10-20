import { User, Role, Question, Form, Submission } from "../models/index.js";
import { sendEmail } from "../helpers/index.js";
import "dotenv/config";
import { submitData } from "../helpers/index.js";
import { getFormData } from "../helpers/index.js";

export const formInputs = async (req, res) => {
  try {
    const user = await User.findById(req.userid);
    const role = await Role.findById(user.role);
    const form = await Form.findById(role.form);
    const gotorole =
      form.goTorole == "" ? "" : await Role.findById(form.goTorole);
    const qna = [];
    for (let i = 0; i < form.questions.length; i++) {
      const element = form.questions[i];
      var qnanext = [];
      for (let nexti = 0; nexti < element.length; nexti++) {
        const e = element[nexti];

        const question = await Question.findById(e);
        qnanext.push(question);
      }
      qna.push(qnanext);
    }

    if (form.validation == true) {
      if (user.previousSubmisson.length == 0) {
        await res.send("No form");
      } else {
        var data = {
          formName: form.formName,
          questions: qna,
          goTorole: gotorole == null ? "" : gotorole.roleName,
          previousSubmisson: [user.previousSubmisson[0]],
        };
        await res.json(await getFormData(data));
      }
    } else {
      const alreadySubmitted = await Submission.findOne({ user: req.userid });
      if (alreadySubmitted != null) {
        await res.send("No form");
      } else {
        var data = {
          formName: form.formName,
          questions: qna,
          goTorole: gotorole == null ? "" : gotorole.roleName,
        };
        await res.json(await getFormData(data));
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const newQues = async (req, res) => {
  const newques = new Question({
    input: req.body.input,
    type: req.body.type,
    val: "",
    subheadings: req.body.subheadings,
  });
  try {
    const datatosave = await newques.save();
    res.status(200).send(datatosave);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/*{
    "input":"Gender",
    "type":"radio",
    "subheadings":["Female","Male"]
} */

/*{
    "formName":"Auth",
    "roleName":"Role B",
    "gotorole":"Role A",
    "validation":false,
    "questions":[["Name of Father"],["APGAR Score"]]
} */
export const newForm = async (req, res) => {
  const role =
    req.body.gotorole == ""
      ? ""
      : await Role.findOne({ roleName: req.body.gotorole });
  var l = [];
  for (let i = 0; i < req.body.questions.length; i++) {
    const element = req.body.questions[i];
    var innerl = [];
    for (let nexti = 0; nexti < element.length; nexti++) {
      const nextele = element[nexti];
      const q = await Question.findOne({ input: nextele });
      innerl.push(q._id);
    }

    l.push(innerl);
  }
  if (role != "") {
    var newform = new Form({
      formName: req.body.formName,
      goTorole: role._id,
      questions: l,
      validation: req.body.validation,
    });
  } else {
    var newform = new Form({
      formName: req.body.formName,
      questions: l,
      validation: req.body.validation,
    });
  }
  try {
    const datatosave = await newform.save();
    const roles = await Role.findOne({ roleName: req.body.roleName });
    await Role.findByIdAndUpdate(roles._id, { form: newform._id });
    res.status(200).send(datatosave);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const submit = async (req, res) => {
  var l = submitData(req.body.questions);

  if (req.body.previousSubmisson.length == 0) {
    const newsubmission = new Submission({
      user: [req.userid],
      questions: l,
    });
    try {

      if (req.body.gotorole != "") {
        newsubmission.isPending=true;
      }
      else{  newsubmission.isPending = false;
      }
      const datatosave = await newsubmission.save();
      
      if (req.body.gotorole != "") {
        const nextrole = await Role.findOne({ roleName: req.body.gotorole });
        
        const selectedperson =
          nextrole.people[Math.floor(Math.random() * nextrole.people.length)];
        const selectedemail = await User.findById(selectedperson);
        await User.findByIdAndUpdate(selectedperson, {
          previousSubmisson: [
            ...selectedemail.previousSubmisson,
            newsubmission._id,
          ],
        });
      const roleForForm = await Role.findById(selectedperson.role);
        await sendEmail(l, selectedemail.email, roleForForm.form);
        res.status(200).send(datatosave);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    const submission = await Submission.findById(req.body.previousSubmisson[0]);
    l = submission.questions.concat(l);
      const user = await User.findById(req.userid);
    await Submission.findByIdAndUpdate(req.body.previousSubmisson[0], {
      questions: l,user: submission.user.concat(user._id)
    });

    var x = user.previousSubmisson;
    x.shift();
    await User.findByIdAndUpdate(req.userid, { previousSubmisson: x });
    if (req.body.gotorole != "") {
      const nextrole = await Role.findOne({ roleName: req.body.gotorole });
      
      const selectedperson =
        nextrole.people[Math.floor(Math.random() * nextrole.people.length)];
      const selectedemail = await User.findById(selectedperson);
      await User.findByIdAndUpdate(selectedperson, {
        previousSubmisson: [...selectedemail.previousSubmisson, submission._id],
      });
      const roleForForm = await Role.findById(selectedperson.role);
      await sendEmail(l, selectedemail.email, roleForForm.form);
      res.status(200).send(l);
    }
  }
};
