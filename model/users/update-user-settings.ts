import { Request, Response } from "express";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";
import { dbUsers } from "../../database/db-models";
import { TSettingsObjRecord } from "../../database/schemas/user.schema";

export const updateUserAppSettings = function () {
  return async (req: Request, res: Response) => {
    try {
      if (req.params.id === ":id") throw new Error("User ID param needed");

      const user = await dbUsers.findById(req.params.id);

      if (!user?.first_name) throw new Error("User not found");

      const body = req.body;

      const obj: TSettingsObjRecord = {
        ...user?.settings,
      };

      if (body?.Profile_Visibility) {
        obj.Profile_Visibility = body?.Profile_Visibility === "true" ? true : false;
      }

      if (body?.Login_Alerts) {
        obj.Login_Alerts = body?.Login_Alerts === "true" ? true : false;
      }

      await dbUsers.findByIdAndUpdate(
        req.params.id,
        { settings: obj },
        {
          runValidators: true,
          new: true,
        }
      );

      response(res, "Your settings have been updated!");
    } catch (err) {
      errorResponce(res, err.message || "Internal Server Error");
    }
  };
};
