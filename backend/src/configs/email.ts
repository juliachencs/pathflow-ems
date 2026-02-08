import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "jacky.kilback@ethereal.email",
    pass: "ZDYByjHbPKjFhCGumq",
  },
});

export const sendInvitation = async (
  email: string,
  name: string,
  registerToken: string,
) => {
  const frontend_base_url =
    process.env.FORNTEND_BASE_URL || "http://localhost:5520";
  const link = frontend_base_url + `/register?registerToken=${registerToken}`;
  const text_email = `
Dear ${name},
We are so excited to have you join us at PathFlowEMS!

To make your boarding process as smooth as possible, please complete your registration in 3 hours using the link below:
${link} 
Please let me know if you have any trouble with the link. 

Best regards, 
PathFlowEMS-HR`;

  const html_email = `<p>Dear ${name}, </p>
   <p>We are so excited to have you join us at PathFlowEMS!</p>
   <p>To make your boarding process as smooth as possible, please complete your registration in <strong>3 hours</strong> using the link below: </p>
   <p><a href="${link}">${link} </a> </p>
   <p>Please let me know if you have any trouble with the link. </p>
   <p>Best regards, </p>
   <p>PathFlowEMS-HR</p>`;

  const info = await transporter.sendMail({
    from: '"PathFLowEMS-HR" <jacky.kilback@ethereal.email>',
    to: email,
    subject: "Invitation to Board PathFlowEMS",
    text: text_email, // Plain-text version of the message
    html: html_email, // HTML version of the message
  });

  console.log("Message sent: %s", info.messageId);

  // Get the Ethereal URL to preview this email
  const previewUrl = nodemailer.getTestMessageUrl(info);
  console.log("Preview URL: %s", previewUrl);

  return info;
};

export const sendNotification = async (
  email: string,
  name: string,
  notification: string,
) => {
  const text_email = `
Dear ${name},

${notification}

Best regards, 
PathFlowEMS-HR`;
  const html_email = `<p>Dear ${name}, </p>
   <p>${notification}</p>
   <p>Best regards, </p>
   <p>PathFlowEMS-HR</p>`;

  const info = await transporter.sendMail({
    from: '"PathFLowEMS-HR" <jacky.kilback@ethereal.email>',
    to: email,
    subject: "Notification for submitting document",
    text: text_email, // Plain-text version of the message
    html: html_email, // HTML version of the message
  });

  console.log("Message sent: %s", info.messageId);

  // Get the Ethereal URL to preview this email
  const previewUrl = nodemailer.getTestMessageUrl(info);
  console.log("Preview URL: %s", previewUrl);

  return info;
};
