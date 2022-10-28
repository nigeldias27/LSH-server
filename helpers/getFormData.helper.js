import { Submission } from "../models";

export async function getFormData(copy_data) {
  var data = copy_data;
  if (data.previousSubmisson != undefined) {
    const submission = await Submission.findById(data.previousSubmisson);
    data = reformatPreviousSubmission(data, submission);
  } else {
    console.log("this is running");
    data = reformatNoPreviousSubmission(data);
  }

  return data;
}

function checkInputSame(questionInput, submission) {
  // Checkbox to be done
  for (let i = 0; i < submission.questions.length; i++) {
    const element = submission.questions[i];
    for (let index = 0; index < element.length; index++) {
      const e = element[index];
      if (e.input == questionInput) {
        return e.val;
      }
    }
  }
  return null;
}

function reformatPreviousSubmission(data, submission) {
  for (
    let questionsindex = 0;
    questionsindex < data.questions.length;
    questionsindex++
  ) {
    const element = data.questions[questionsindex];
    for (
      let innerquestionsindex = 0;
      innerquestionsindex < element.length;
      innerquestionsindex++
    ) {
      const e = element[innerquestionsindex];
      if (
        data.questions[questionsindex][innerquestionsindex].type == "checkbox"
      ) {
        var l = [];
        for (
          let il = 0;
          il <
          data.questions[questionsindex][innerquestionsindex].subheadings
            .length;
          il++
        ) {
          l.push(false);
        }
        if (
          checkInputSame(
            data.questions[questionsindex][innerquestionsindex].input,
            submission
          ) != null
        ) {
          data.questions[questionsindex][innerquestionsindex] = {
            input: data.questions[questionsindex][innerquestionsindex].input,
            _id: data.questions[questionsindex][innerquestionsindex]._id,
            type: data.questions[questionsindex][innerquestionsindex].type,
            subheadings:
              data.questions[questionsindex][innerquestionsindex].subheadings,
            val: checkInputSame(
              data.questions[questionsindex][innerquestionsindex].input,
              submission
            ),
          };
        } else {
          data.questions[questionsindex][innerquestionsindex] = {
            input: data.questions[questionsindex][innerquestionsindex].input,
            _id: data.questions[questionsindex][innerquestionsindex]._id,
            type: data.questions[questionsindex][innerquestionsindex].type,
            subheadings:
              data.questions[questionsindex][innerquestionsindex].subheadings,
            val: JSON.stringify(l),
          };
        }
      } else {
        if (
          checkInputSame(
            data.questions[questionsindex][innerquestionsindex].input,
            submission
          ) != null
        ) {
          data.questions[questionsindex][innerquestionsindex] = {
            input: data.questions[questionsindex][innerquestionsindex].input,
            _id: data.questions[questionsindex][innerquestionsindex]._id,
            type: data.questions[questionsindex][innerquestionsindex].type,
            subheadings:
              data.questions[questionsindex][innerquestionsindex].subheadings,
            val: checkInputSame(
              data.questions[questionsindex][innerquestionsindex].input,
              submission
            ),
          };
        } else {
          data.questions[questionsindex][innerquestionsindex] = {
            input: data.questions[questionsindex][innerquestionsindex].input,
            _id: data.questions[questionsindex][innerquestionsindex]._id,
            type: data.questions[questionsindex][innerquestionsindex].type,
            subheadings:
              data.questions[questionsindex][innerquestionsindex].subheadings,
            val: "",
          };
        }
      }
    }
  }
  return data;
}

function reformatNoPreviousSubmission(data) {
  for (
    let questionsindex = 0;
    questionsindex < data.questions.length;
    questionsindex++
  ) {
    const element = data.questions[questionsindex];
    for (
      let innerquestionsindex = 0;
      innerquestionsindex < element.length;
      innerquestionsindex++
    ) {
      const e = element[innerquestionsindex];
      if (
        data.questions[questionsindex][innerquestionsindex].type == "checkbox"
      ) {
        var l = [];
        for (
          let il = 0;
          il <
          data.questions[questionsindex][innerquestionsindex].subheadings
            .length;
          il++
        ) {
          l.push(false);
        }
        data.questions[questionsindex][innerquestionsindex] = {
          input: data.questions[questionsindex][innerquestionsindex].input,
          _id: data.questions[questionsindex][innerquestionsindex]._id,
          type: data.questions[questionsindex][innerquestionsindex].type,
          subheadings:
            data.questions[questionsindex][innerquestionsindex].subheadings,
          val: JSON.stringify(l),
        };
      } else {
        data.questions[questionsindex][innerquestionsindex] = {
          input: data.questions[questionsindex][innerquestionsindex].input,
          _id: data.questions[questionsindex][innerquestionsindex]._id,
          type: data.questions[questionsindex][innerquestionsindex].type,
          subheadings:
            data.questions[questionsindex][innerquestionsindex].subheadings,
          val: "",
        };
      }
    }
  }
  return data;
}
