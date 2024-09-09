import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  htmlContent: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
  }
};

