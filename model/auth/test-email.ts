import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { dbUsers } from "../../database/db-models";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";

export const verifyIfEmailNotExists = function () {
  return async (req: Request, res: Response) => {
    try {
      const user = await dbUsers.exists({ email: req.query.email });

      if (user?._id) throw new Error("Email Exists!");

      response(res, "Email does not exist");
    } catch (err) {
      errorResponce(res, "Email exists!", 404);
    }
  };
};
