import { Request, Response } from "express";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";
import { dbUsers } from "../../database/db-models";
import { capitalizeEachWord } from "../../utils/config";
import { sendVerifyEmail } from "../../view/email-models";
import jwt from "jsonwebtoken";

export const signupAUser = function () {
  return async (req: Request, res: Response) => {
    try {
      req.body.student_number =
        String(req.body.first_name)[0].toUpperCase() +
        String(req.body.last_name)[0].toUpperCase() +
        String(Math.trunc(Math.random() * 9) + 1) +
        String(Math.trunc(Math.random() * 9) + 1) +
        String(Math.trunc(Math.random() * 9) + 1)
        +
        String(Math.trunc(Math.random() * 9) + 1);

      req.body.first_name = capitalizeEachWord(req.body.first_name);
      req.body.last_name = capitalizeEachWord(req.body.last_name);
      req.body.createdAt = Date.now();

      const returned = await dbUsers.create(req.body);

      response(res, `${req.body.role} created`, returned);

      const token = jwt.sign(
        {
          email: returned.email,
        },
        process.env.jwtkey,
        { expiresIn: "90d" }
      );

      sendVerifyEmail(
        returned?.email,
        returned?.last_name,
        "Verify Email",
        `${process.env.herokuBaseUrl}/email/ver/${token}`
      );
    } catch (err) {
      console.log(err);
      errorResponce(res, err.message || "Internal Server Error");
    }
  };
};
