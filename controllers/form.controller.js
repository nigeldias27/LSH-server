import { User, Role, Question, Form } from "../models/index.js";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
const form_inputs = async (req, res) => {
  try {
    const user = await User.findById(req.userid);
    const role = await Role.findById(user.role);
    const form = await Form.findById(role.form);
    const gotorole = await Role.findById(form.goTorole);

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
    res.json({
      formName: form.formName,
      questions: qna,
      goTorole: gotorole.roleName,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const newques = async (req, res) => {
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
    res.status(400).send(error);
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
    "questions":[["Name of Father"],["APGAR Score"]]
} */
const newform = async (req, res) => {
  const role = await Role.findOne({ roleName: req.body.roleName });
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
  console.log(l);
  const newform = new Form({
    formName: req.body.formName,
    goTorole: role._id,
    questions: l,
  });
  try {
    const datatosave = await newform.save();
    res.status(200).send(datatosave);
  } catch (error) {
    res.status(400).send(error);
  }
};

const sendemail = async (req, res) => {
  Role.findOne({ roleName: req.body.gotorole }, function (err, role) {
    var rolearr = role.people;
    for (let i = 0; i < rolearr.length; i++) {
      const element = rolearr[i];
      User.findById(element, (err, users) => {
        // users.email
        //TODO: Send email to people which have the same role as the gotorole with the incoming form data
        var transporter = nodemailer.createTransport(
          smtpTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
              user: "retailstoreprojects@gmail.com",
              pass: "dpse@2020",
            },
          })
        );

        var mailOptions = {
          from: "retailstoreprojects@gmail.com",
          to: users.email,
          subject: "Linguaphile Form",
          text: req.body.data,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.send(error);
          } else {
            res.send("Email sent: " + info.response);
          }
        });
      });
    }
  });
};

export { form_inputs, sendemail, newques, newform };
