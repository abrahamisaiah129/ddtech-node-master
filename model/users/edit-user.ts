import { Request, Response } from "express";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";
import { dbUsers } from "../../database/db-models";

export const editUser = function () {
  return async (req: Request, res: Response) => {
    try {
      if (req.params.id === ":id") throw new Error("User ID param needed");

      const user = await dbUsers.findById(req.params.id);

      if (!user?.first_name) throw new Error("User not found");

      const obj: any = {};

      if (req.body.first_name) {
        obj.first_name = req.body?.first_name;
      }

      if (req.body.last_name) {
        obj.last_name = req.body?.last_name;
      }

      if (req.body.about) {
        obj.about = req.body?.about;
      }

      if (req.body.mobile) {
        obj.mobile = req.body?.mobile;
      }

      if (req.body.address) {
        if (!req.body?.address?.addressString) throw new Error("Invalid Address Object");

        obj.address = req.body?.address;
      }

      const done = await dbUsers.findByIdAndUpdate(req.params.id, obj, { runValidators: true, new: true });

      response(res, "User Edited", done);
    } catch (err) {
      errorResponce(res, err.message || "Internal Server Error");
    }
  };
};
