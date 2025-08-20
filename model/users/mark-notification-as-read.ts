import { Request, Response } from "express";
import { dbUsers } from "../../database/db-models";
import { response } from "../../server-responce/success";
import { errorResponce } from "../../server-responce/error";
import { TANotification } from "../../database/schemas/user.schema";

export const markNotificationAsRead = function () {
  return async (req: Request, res: Response) => {
    try {
      const notificationID = req.params?.notificationID;

      const user = await dbUsers.findById(req.params.userID);

      if (!user?.first_name) throw new Error("User not found");

      if (req.query?.all) {
        const done = await dbUsers.findByIdAndUpdate(
          req.params?.userID,
          {
            notifications: user?.notifications?.map((e: TANotification) => {
              e.is_read = true;
              return e;
            }),
          },
          { runValidators: true }
        );

        response(res, "All notifications marked as read...", done);
      } else if (notificationID) {
        const foundNotification = user?.notifications?.find(
          (e: TANotification) => String(e?._id) == String(notificationID)
        );

        if (!foundNotification) throw new Error("Notification not found!");

        foundNotification.is_read = true;

        const done = await dbUsers.findByIdAndUpdate(
          req.params?.userID,
          { notifications: user?.notifications },
          { runValidators: true }
        );

        response(res, "Notification marked as read...", done);
      } else response(res, "Not found!");
    } catch (err) {
      errorResponce(res, err.message || "Error updating notification", 404);
    }
  };
};
