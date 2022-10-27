import { Question, Role, Submission, User } from "../models/index.js";

export async function pendingForms(req, res) {
  var l = [];
  try {
    const users = await User.findById(req.userid);
    for (let i = 0; i < users.previousSubmisson.length; i++) {
      const submissionId = users.previousSubmisson[i];
      const submission = await Submission.findById(submissionId);
      l.push(submission);
    }
    res.json(l);
  } catch (error) {
    res.send(error.message);
  }
}

export async function completedForms(req, res) {
  var l = [];
  try {
    const submissions = await Submission.find({});
    for (let i = 0; i < submissions.length; i++) {
      const submission = submissions[i];
      for (let j = 0; j < submission.user.length; j++) {
        const user = submission.user[j];
        if (user == req.userid._id && submission.user.length == 4) {
          var idAddedObject = await addIdToObject(submission);
          l.push(idAddedObject);
        }
      }
    }
    res.json(l);
  } catch (error) {
    res.send(error.message);
  }
}

async function addIdToObject(data) {
  for (let i = 0; i < data.questions.length; i++) {
    const element = data.questions[i];
    for (let j = 0; j < element.length; j++) {
      const e = element[j];
      var id = await Question.findOne({ input: e.input });
      e.id = id._id;
      e.type = id.type;
      e.subheadings = id.subheadings;
    }
  }
  return data;
}
export async function getUserInfo(req, res) {
  try {
    const userInfo = await User.findById(req.params.userId);
    res.json(userInfo);
  } catch (error) {
    res.send(error.message);
  }
}

export async function createForm(req, res) {
  try {
    const userInfo = await User.findById(req.userid);
    const role = await Role.findById(userInfo.role);
    res.send(role.roleName);
  } catch (error) {
    res.send(error.message);
  }
}
