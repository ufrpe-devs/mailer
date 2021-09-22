const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const simpleGit = require('simple-git');

const build = require('./build');

const git = simpleGit();

const loadConfig = () => {
  const data = fs.readFileSync(
    path.join(__dirname, '../data/config.json'),
    'utf-8'
  );
  return JSON.parse(data);
};

const questions = [
  {
    type: 'text',
    name: 'email',
    message: '[Credentials] Email:',
  },
  {
    type: 'password',
    name: 'password',
    message: '[Credentials] Password:',
  },
];

const confirm = [
  {
    type: 'confirm',
    name: 'isOk',
    message: 'Are you sure that you want to send the above email?',
    initial: false,
  },
];

(async () => {
  const config = loadConfig();

  const response = await prompts(questions);

  const { id, rendered } = build(config);

  console.log(`
    from: "${config.username}" <${config.from}>
    to: ${config.to}
    subject: ${config.subject}
    rendered: file:///${__dirname}/build/${id}
  `);

  const confirmResponse = await prompts(confirm);

  if (!confirmResponse.isOk) {
    console.log('Exiting...');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: response.email,
      pass: response.password,
    },
  });

  const mailOptions = {
    from: `"${config.username}" <${config.from}>`,
    to: config.to,
    subject: config.subject,
    html: rendered,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})();
