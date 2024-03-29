import { User, Role, Question, Form, Submission } from "../models/index.js";
import { sendEmail } from "../helpers/index.js";
import "dotenv/config";
import { submitData } from "../helpers/index.js";
import { getFormData } from "../helpers/index.js";
import nodemailer from "nodemailer";

export const formInputs = async (req, res) => {
  try {
    const user = await User.findById(req.userid);
    const role = await Role.findById(user.role);
    const form = await Form.findById(role.form);
    const listOfGoToRoles = [];
    for (let i = 0; i < form.goTorole.length; i++) {
      const element = form.goTorole[i];
      const idToRole = await Role.findById(element);
      listOfGoToRoles.push(idToRole);
    }
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
          goTorole: listOfGoToRoles,
          previousSubmisson: [req.params.submissionId],
        };
        await res.json(await getFormData(data));
      }
    } else {
      var data = {
        formName: form.formName,
        questions: qna,
        goTorole: listOfGoToRoles,
      };
      await res.json(await getFormData(data));
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
  const role = [];
  for (let j = 0; j < req.body.gotorole.length; j++) {
    const element = req.body.gotorole[j];
    const foundRole = await Role.findOne({ roleName: element });
    role.push(foundRole._id);
  }

  var l = [];
  for (let i = 0; i < req.body.questions.length; i++) {
    const element = req.body.questions[i];
    var innerl = [];
    for (let nexti = 0; nexti < element.length; nexti++) {
      const nextele = element[nexti];
      console.log(nextele);
      const q = await Question.findOne({ input: nextele });
      innerl.push(q._id);
    }

    l.push(innerl);
  }
  var newform = new Form({
    formName: req.body.formName,
    goTorole: role,
    questions: l,
    validation: req.body.validation,
  });

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
  //removing previousSubmission from the body
  if (req.params.submissionId == "parent") {
    const newsubmission = new Submission({
      user: [req.userid],
      questions: l,
    });
    try {
      const datatosave = await newsubmission.save();
      var transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
          ciphers: "SSLv3",
        },
        auth: {
          user: "nigeldias27@outlook.com",
          pass: `${process.env.EMAIL_PASS}`,
        },
      });
      var mydata = "";
      for (let index = 0; index < l.length; index++) {
        const element = l[index];
        for (let innerindex = 0; innerindex < element.length; innerindex++) {
          const e = element[innerindex];
          mydata = mydata + e.input + "\n";
          if (typeof e.val == "string") {
            mydata = mydata + e.val + "\n";
          } else {
            for (let myindex = 0; myindex < e.val.length; myindex++) {
              const el = e.val[myindex];
              mydata = mydata + el + "\n";
            }
          }
        }
      }
      for (let i = 0; i < req.body.goTorole.length; i++) {
        const nextrole = req.body.goTorole[i];
        const selectedperson =
          nextrole.people[Math.floor(Math.random() * nextrole.people.length)];
        const selectedemail = await User.findById(selectedperson);
        await User.findByIdAndUpdate(selectedperson, {
          previousSubmisson: [
            ...selectedemail.previousSubmisson,
            newsubmission._id,
          ],
        });
        const roleForForm = await Role.findById(selectedemail.role);
        var finalData =
          mydata +
          `\n Link to form: ${
            process.env.EMAIL_LINK
          }/${roleForForm.form.toString()}`;

        // setup e-mail data, even with unicode symbols
        var mailOptions = {
          from: '"Linguaphile Skills Hub " <nigeldias27@outlook.com>', // sender address (who sends)
          to: selectedemail.email, // list of receivers (who receives)
          subject: "Form Submission ", // Subject line
          text: finalData, // plaintext body
          // html: data, // html body
        };
        console.log("Before sending email");
        // send mail with defined transport object
        await transporter.sendMail(mailOptions);
        //       await sendEmail(
        //         mydata,
        //         selectedemail.email,
        //         roleForForm.form,
        //         transporter
        //      );
      }

      res.status(200).send(datatosave);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else {
    //    const submission = await Submission.findById(req.body.previousSubmisson[0]);
    const submission = await Submission.findById(req.params.submissionId);
    l = submission.questions.concat(l);
    const user = await User.findById(req.userid);
    await Submission.findByIdAndUpdate(req.params.submissionId, {
      questions: l,
      user: submission.user.concat(user._id),
    });

    var x = user.previousSubmisson;
    const index = x.indexOf(req.params.submissionId);
    if (index > -1) {
      // only splice array when item is found
      x.splice(index, 1); // 2nd parameter means remove one item only
    }
    await User.findByIdAndUpdate(req.userid, { previousSubmisson: x });
    res.status(200).send("Success");
    /*
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
    }*/
  }
};
