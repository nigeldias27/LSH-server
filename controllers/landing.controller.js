import { Role, Submission, User } from "../models/index.js";

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
          l.push(submission);
        }
      }
    }
    res.json(l);
  } catch (error) {
    res.send(error.message);
  }
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
