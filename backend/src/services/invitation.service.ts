import { ApolloError } from "apollo-server";
import { sendEmail } from "../config/mailer";
import { Invitation } from "../entities/invitation";
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
      throw new Error("Enquête introuvable.");
    }

    const Invitations = await Invitation.find({
      select: ["invitedEmail"],
      where: { survey: survey },
    });

    const alreadyInvited = Invitations.map((invitation) => {
      return emails.includes(invitation.invitedEmail)
        ? invitation.invitedEmail
        : null;
    });

    console.log("alreadyInvited :", alreadyInvited);

    if (alreadyInvited.length) {
      throw new Error(
        `${alreadyInvited.join(", ")} ${
          alreadyInvited.length > 1
            ? "ont déjà été invités"
            : "est déjà invité."
        }`
      );
    }

    for (const email of emails) {
      const expirationDate = 24 * 60 * 60 * 1000;
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
        expiresIn: expirationDate,
      });

      const invitation = new Invitation();
      invitation.invitedEmail = email;
      invitation.token = token;
      invitation.expiresAt = new Date(Date.now() + expirationDate)
        .getTime()
        .toString();
      invitation.survey = survey;
      await invitation.save();

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
    throw error;
  }
}

// export async function validateInvitation(token: string): Promise<void> {
//   try {
//     if (process.env.JWT_SECRET_KEY === undefined) {
//       throw new Error();
//     }

//     const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY) as {
//       email: string;
//     };
//     const invitation = await Invitation.findOne({
//       where: { invitedEmail: email },
//     });
//     if (!invitation) {
//       throw new Error();
//     }
//     invitation.isUsed = true;
//     await invitation.save();
//   } catch (error) {
//     console.error("Erreur lors de la validation de l'invitation :", error);
//     throw new ApolloError("Erreur lors de la validation de l'invitation.");
//   }
// }

export async function findInvitationsByLink(
  link: string
): Promise<Invitation[]> {
  try {
    const survey = await findSurveyByLink(link);
    if (!survey) {
      throw new Error();
    }
    return await Invitation.find({
      where: { survey: survey },
      relations: ["survey"],
    });
  } catch (error) {
    console.error("Erreur lors de la recherche des invitations :", error);
    throw new ApolloError("Erreur lors de la recherche des invitations.");
  }
}

