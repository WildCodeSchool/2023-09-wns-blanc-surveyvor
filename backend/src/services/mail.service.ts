import { ApolloError } from "apollo-server";
import { sendEmail } from "../config/mailer";
import { InvitationToken } from "../entities/invitationToken";
import { findSurveyByLink } from "./survey.service";
import jwt from "jsonwebtoken";

export async function sendInvitations(
  emails: string[],
  link: string
): Promise<void> {
  try {
    if (process.env.JWT_SECRET_KEY === undefined) {
      throw new Error();
    }

    const survey = await findSurveyByLink(link);

    if (!survey) {
      throw new Error();
    }

    for (const email of emails) {
      const expirationDate = 24 * 60 * 60 * 1000;
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
        expiresIn: expirationDate,
      });

      const invitationToken = new InvitationToken();
      invitationToken.invitedEmail = email;
      invitationToken.token = token;
      invitationToken.expiresAt = new Date(Date.now() + expirationDate)
        .getTime()
        .toString();
      await invitationToken.save();

      const passToSurvey = `${process.env.FRONTEND_URL}/answers/${link}?token=${token}`;

      const htmlContent = `
            <p>Bonjour,</p>
            <p>Vous êtes invité à participer à une enquête :</p>
            <div style="background-color: #f5f3ff; border: 1px solid #ddd6fe; padding: 10px; border-radius: 5px; align-items: center">
            <h2>${survey.title}</h2>
            <p>${survey.description}</p>
            <p>Cliquez sur le lien ci-dessous pour y participer :</p>
            <p><a href="${passToSurvey}" style="color: blue; text-decoration: underline;">Participer à l'enquête</a></p>
            </div>
            <p>Merci !</p>
          `;

      await sendEmail(
        email,
        "Invitation à un sondage",
        `Bonjour,\n\nVous êtes invité à participer à une enquête. Cliquez sur le lien suivant pour y répondre : ${passToSurvey}\n\nMerci !`,
        htmlContent
      );
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi des invitations :", error);
    throw new ApolloError("Erreur lors de l'envoi des invitations.");
  }
}

