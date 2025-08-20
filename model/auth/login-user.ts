import { Response, Request } from "express";
import { dbUsers } from "../../database/db-models";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendFullNotificationPackageToAUser } from "../notifications/notification-tools";
import { getDateValue } from "../../utils/config";

export function loginAUser() {
  return async (req: Request, res: Response) => {
    try {
      const start = dbUsers.findOne({ email: req.body.email }).select("+password");

      const theUser = await start;

      if (!theUser?._id) throw new Error("This user does not exist");

      if (!theUser?.is_email_verified) throw new Error("Please verify your email");

      if (!theUser?.is_active) throw new Error("This user does not exist");

      const passwordIsCorrect = await bcrypt.compare(req.body.loginPass, theUser?.password);

      if (!passwordIsCorrect) throw new Error("Incorrect Email or Password");

      const token = jwt.sign(
        {
          email: theUser.email,
          role: theUser.role,
          student_number: theUser.student_number,
        },
        process.env.jwtkey,
        { expiresIn: "90d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.prod === "yes" ? true : false,
        sameSite: "none",
        expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      });

      response(res, "User Logged In", {
        email: theUser.email,
        role: theUser.role,
        student_number: theUser.student_number,
        token,
      });

      sendFullNotificationPackageToAUser(
        theUser?._id,
        {
          title: "Login Alert",
          message: `There was a login attempt into your account at ${getDateValue(new Date(Date.now()))}. If this was not you, please contact support immediately.`,
          createdAt: Date.now(),
          notification_type: "security",
        },
        "Login_Alerts"
      );
    } catch (err) {
      errorResponce(res, err.message || "Internal Server Error");
    }
  };
}
