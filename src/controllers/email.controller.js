import nodeMailer from "nodemailer";

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

export const sendEmail = async (data, req, res) => {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass,
    },
  });
  try {
    const info = await transporter.sendMail({
      from: '"Remitente" <testbot@gmail.com>',
      to: data.to,
      subject: data.text,
      html: data.html,
    });
  } catch (error) {
    console.log(error);
  }
};
