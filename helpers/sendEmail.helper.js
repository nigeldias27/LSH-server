import nodemailer from "nodemailer";
import "dotenv/config";
export const sendEmail = async (mydata, to, formIdLink, transporter) => {
  mydata =
    mydata +
    `\n Link to form: ${process.env.EMAIL_LINK}/${formIdLink.toString()}`;

  // setup e-mail data, even with unicode symbols
  var mailOptions = {
    from: '"Linguaphile Skills Hub " <nigeldias27@outlook.com>', // sender address (who sends)
    to: to, // list of receivers (who receives)
    subject: "Form Submission ", // Subject line
    text: mydata, // plaintext body
    // html: data, // html body
  };
  console.log("Before sending email");
  // send mail with defined transport object
  await transporter.sendMail(mailOptions);
};
