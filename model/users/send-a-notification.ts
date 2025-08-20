import { Request, Response } from "express";
import { dbUsers } from "../../database/db-models";
import { response } from "../../server-responce/success";
import { errorResponce } from "../../server-responce/error";
import { TANotification, TUserRoles } from "../../database/schemas/user.schema";
import { notificationTypeOptions } from "../../utils/config";

export const sendNotificationToOneOrMoreUsers = function () {
  return async (req: Request, res: Response) => {
    try {
      const body = req.body as TANotification;

      if (!notificationTypeOptions?.includes(body?.notification_type))
        throw new Error("Invalid notification type");

      if (!body?.title || !body?.message) throw new Error("Invalid body");

      const role = req.query?.role as TUserRoles;

      if (role) {
        await dbUsers.updateMany(
          { role: role },
          { $push: { notifications: { ...body, createdAt: Date.now() } } },
          { runValidators: true }
        );
      } else if (req.query?.userID) {
        const user = await dbUsers.findById(req.query?.userID);

        if (!user?.first_name) throw new Error("User not found");

        await dbUsers.findByIdAndUpdate(
          req.query?.userID,
          { $push: { notifications: { ...body, createdAt: Date.now() } } },
          { runValidators: true }
        );
      }

      response(res, "Notifications Sent!");
    } catch (err) {
      errorResponce(res, err.message || "Error updating notification", 404);
    }
  };
};
