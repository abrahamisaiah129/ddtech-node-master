import { dbUsers } from "../../database/db-models";
import { TANotification, TSettingsOptions } from "../../database/schemas/user.schema";
import { sendEmailNotification } from "../../view/email-models";

export const sendFullNotificationPackageToAUser = async (
  userID: string,
  body: TANotification,
  type: TSettingsOptions
) => {
  try {
    const theUser = await dbUsers.findById(userID);

    if (!theUser?.settings[type] || !theUser?.is_active || !theUser?.is_email_verified) return;

    await dbUsers.findByIdAndUpdate(
      userID,
      { $push: { notifications: body } },
      { runValidators: true }
    );

    sendEmailNotification(theUser?.email, theUser?.last_name, body?.title, body?.message);
  } catch (err) {
    console.log("Error sending notification", err);
  }
};
