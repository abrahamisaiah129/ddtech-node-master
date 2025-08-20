import { Request, Response } from "express";
import { dbUsers } from "../../database/db-models";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "../../view/email-models";

export const initiatePasswordResert = function () {
  return async (req: Request, res: Response) => {
    try {
      const email = req.body.email;

      const user = await dbUsers.findOne({ email: email });

      if (!user?.email) throw new Error("User Does Not Exist");

      const token_id =
        String(Math.trunc(Math.random() * 9) + 1) +
        String(Math.trunc(Math.random() * 9) + 1) +
        String(Math.trunc(Math.random() * 9) + 1) +
        String(Math.trunc(Math.random() * 9) + 1);

      const token = jwt.sign({ email: email }, process.env.jwtkey, {
        expiresIn: "10m",
      });

      await dbUsers.findOneAndUpdate(
        { email: email },
        { login_token: { token_id, token } },
        { runValidators: true }
      );

      sendPasswordResetEmail(email, user?.first_name, token_id);

      response(res, "Password Change Email Sent To User");
    } catch (err) {
      errorResponce(res, err.message || "Unknown Error", 404);
    }
  };
};


