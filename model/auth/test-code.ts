import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { dbUsers } from "../../database/db-models";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";

export const verifyCode = function () {
  return async (req: Request, res: Response) => {
    try {
      const start = dbUsers
        .findOne({ email: req.params.email })
        .select("+login_token.token +login_token.token_id");

      const user = await start;

      if (user?.login_token?.token_id !== req.body.token) throw new Error("Invalid Code");

      jwt.verify(user?.login_token?.token, process.env.jwtkey, async (err) => {
        if (err) return errorResponce(res, "Invalid Code", 401);

        response(res, "Success", "true");
      });
    } catch (err) {
      errorResponce(res, "Invalid Code", 401);
    }
  };
};
