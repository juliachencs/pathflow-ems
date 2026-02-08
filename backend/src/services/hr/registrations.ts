import { sendInvitation } from "@/configs/email";
import { Registration } from "@/models/registration";
import { EamilError, type INodeMailerError } from "@/types/email.errors";

export async function sendInvitationService(name: string, email: string) {
  const uniqueToken = crypto.randomUUID();
  // TODO: await the email send
  try {
    await sendInvitation(email, name, uniqueToken);
  } catch (error) {
    //https://nodemailer.com/errors

    throw new EamilError(error as INodeMailerError);
  }

  const registration = new Registration({
    name,
    email,
    registerToken: uniqueToken,
  });

  await registration.save();
}

export async function getRegistrationsService() {
  return await Registration.find(
    {},
    "name email registerToken createAt",
  ).exec();
}
