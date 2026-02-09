import { sendInvitation } from "@/configs/email";
import { Registration } from "@/models/registration";
import { EamilError, type INodeMailerError } from "@/types/email.errors";
import { HttpConfilctError } from "@/types/http.errors";
import { registerLink } from "@/utils/utils";

export async function sendInvitationService(name: string, email: string) {
  const uniqueToken = crypto.randomUUID();

  // check if the email has in the registration
  let registration = await Registration.findOne({ email: email }).exec();
  let isResent = false;
  // the email is in registration history
  if (registration) {
    // the user has registered
    if (registration.employeeId) {
      throw new HttpConfilctError("INVITE_CONFICT");
    }

    // the email exists but not registers, update the record
    registration.registerToken = uniqueToken;
    isResent = true;
  } else {
    // make a new registration record
    registration = new Registration({
      name: name,
      email: email,
      registerToken: uniqueToken,
    });
  }

  // send out the inviation
  try {
    await sendInvitation(email, name, uniqueToken);
  } catch (error) {
    //https://nodemailer.com/errors

    throw new EamilError(error as INodeMailerError);
  }

  // update the registration record
  await registration.save();

  const history = await getHistory();
  return { history, isResent };
}

export async function getRegistrationsService() {
  return await getHistory();
}

export async function getHistory() {
  const query = Registration.find().lean();
  query.transform((docs) => {
    return docs.map((doc) => ({
      name: doc.name,
      email: doc.email,
      registrationLink: registerLink(doc.registerToken),
      hasRegistered: doc.employeeId || false,
      hasApplied: doc.hasApplied || false,
    }));
  });

  const history = await query.exec();
  return history;
}
