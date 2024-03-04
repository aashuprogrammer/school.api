import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "09cd156d330a23",
    pass: "f497699a129d29",
  },
});

const sendEmail = async (name, email, subject, html) => {
  const info = await transport.sendMail({
    from: '"Vidyalaya" <admin@school.com>', // sender address
    to: `"${name}" <${email}>`, // list of receivers
    subject, // Subject line
    html, // html body
  });
  return info;
};

export { sendEmail };
