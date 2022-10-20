import nodemailer from "nodemailer";
import "dotenv/config";
export const sendEmail = async (data, to,formIdLink) => {
  var mydata = "";
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
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
  mydata = mydata + `\n Link to form: ${process.env.EMAIL_LINK}/${formIdLink.toString()}`;

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

  // setup e-mail data, even with unicode symbols
  var mailOptions = {
    from: '"Linguaphile Skills Hub " <nigeldias27@outlook.com>', // sender address (who sends)
    to: to, // list of receivers (who receives)
    subject: "Form Submission ", // Subject line
    text: mydata, // plaintext body
    // html: data, // html body
  };

  // send mail with defined transport object
  await transporter.sendMail(mailOptions);
};
