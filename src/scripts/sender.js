const nodemailer = require("nodemailer");
const render = require("./core");

const prompts = require("prompts");

const questions = [
  {
    type: "text",
    name: "username",
    message: "What is the user name?",
  },
  {
    type: "text",
    name: "email",
    message: "What is the sender email address?",
  },
  {
    type: "text",
    name: "pass",
    message: "What about the password?",
  },
  {
    type: "text",
    name: "subject",
    message: "What is the subject?",
  },
  {
    type: "text",
    name: "recipients",
    message: "Hho will receive the email?",
    initial: "use the , for multiple recipients address",
  },
];

(async () => {
  const response = await prompts(questions);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: response.email,
      pass: response.pass,
    },
  });

  const mailOptions = {
    from: `"${response.username}" <${response.email}>`,
    to: response.recipients,
    subject: response.subject,
    html: render({ development: false }),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
})();
