import { Request, Response } from "express";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";
import { dbUsers } from "../../database/db-models";
import { sendVerifyEmail } from "../../view/email-models";
import jwt from "jsonwebtoken";

export const resendVerification = function () {
  return async (req: Request, res: Response) => {
    try {
      const user = await dbUsers.findOne({ email: req.query?.email });

      const token = jwt.sign(
        {
          email: user.email,
        },
        process.env.jwtkey,
        { expiresIn: "90d" }
      );

      sendVerifyEmail(
        user?.email,
        user?.last_name,
        "Verify Email",
        `${process.env.herokuBaseUrl}/email/ver/${token}`
      );

      response(res, "Email sent!");
    } catch (err) {
      console.log(err);
      errorResponce(res, err.message || "Internal Server Error");
    }
  };
};
