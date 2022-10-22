import { Submission } from "../models/index.js";

export async function pendingForms(req, res) {
  var l = [];
  try {
    const submissions = await Submission.find({});
    for (let i = 0; i < submissions.length; i++) {
      const submission = submissions[i];
      for (let j = 0; j < submission.user.length; j++) {
        const user = submission.user[j];
        if (user == req.userid && submission.user.length != 4) {
          l.push(submission);
        }
      }
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
        if (user == req.userid && submission.user.length == 4) {
          l.push(submission);
        }
      }
    }
    res.json(l);
  } catch (error) {
    res.send(error.message);
  }
}
