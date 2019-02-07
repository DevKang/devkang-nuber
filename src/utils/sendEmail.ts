import Mailgun from 'mailgun-js';

const maillgunClient = new Mailgun({
  apiKey: process.env.MAILGUN_TOKEN || '',
  domain: 'sandbox9a9f8528f6b4447bbf6c5d3c53b59c1b.mailgun.org'
});

const sendEmail = (subject:string, html:string) => {
  const emailData: Mailgun.messages.SendData = {
    from: 'olddeapo@gmail.com',
    to: 'olddeapo@gmail.com',
    subject,
    html
  }
  return maillgunClient.messages().send(emailData)
}

export const sendVerificationEmail = (fullName:string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
const emailBody = `Verify your email by clicking <a href="http://blallbna.com/verification/${key}"> here </a>`;
  return sendEmail(emailSubject, emailBody);
}