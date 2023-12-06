import SMTPConnection from "nodemailer/lib/smtp-connection";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
const SMTP_SECURE = true;
const SMTP_AUTH = {
  user: process.env.SMTP_CREDENTIALS_USER_ID,
  pass: process.env.SMTP_CRENDETIALS_PASSWORD,
};

const mailTransport = (
  host: SMTPConnection.Options["host"],
  port: SMTPConnection.Options["port"],
  secure: SMTPConnection.Options["secure"],
  auth: SMTPConnection.AuthenticationType
) => {
  const transportOptions = {
    host,
    port,
    secure,
    auth,
  };

  return nodemailer.createTransport(transportOptions);
};

const sendMail = async (
  hostEmail: string,
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  const transport = mailTransport(SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_AUTH);

  const mailOptions = {
    from: hostEmail,
    to,
    subject,
    text,
    html,
  };

  await transport.sendMail(mailOptions);
};
