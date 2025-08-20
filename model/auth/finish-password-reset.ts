import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { dbUsers } from "../../database/db-models";
import { response } from "../../server-responce/success";
import { errorResponce } from "../../server-responce/error";

export const finalChangePassword = function () {
  return async (req: Request, res: Response) => {
    try {
      if (!req.body.email || !req.body.token || !req.body.password)
        throw new Error("Invalid Request");

      const start = dbUsers
        .findOne({ email: req.body.email })
        .select("+login_token.token +login_token.token_id");

      const user = await start;

      if (!user?.email) throw new Error("This user does not exist");

      if (user?.login_token?.token_id !== req.body.token)
        throw new Error("Invalid Password Change Token");

      jwt.verify(user?.login_token?.token, process.env.jwtkey, async (err, obj: any) => {
        if (err) throw new Error("Authentication Failed");

        const user = await dbUsers.findOne({ email: obj.email });

        if (!user) throw new Error("Authentication Failed");

        await dbUsers
          .findOneAndUpdate({ email: obj.email }, { password: req.body.password })
          .select("password");

        response(res, "Password Change Successful!");
      });
    } catch (err) {
      console.log(err);
      errorResponce(res, err.message || "Unknown Error", 404);
    }
  };
};
