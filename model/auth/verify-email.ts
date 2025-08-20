import { Request, Response } from "express";
import { dbUsers } from "../../database/db-models";
import jwt from "jsonwebtoken";

export const verifyEmail = () => {
  return async (req: Request, res: Response) => {
    try {
      const token = req.params.token as string;

      jwt.verify(token, process.env.jwtkey as string, async (err: any, obj: any) => {
        try {
          if (err) throw new Error("Authentication failed");
          if (!obj?.email) throw new Error("Authentication failed");

          const email = obj?.email;

          const user = await dbUsers.findOne({ email: email });

          if (!user?._id) throw new Error("This user does not exist");

          await dbUsers.findOneAndUpdate(
            { email: email },
            { is_email_verified: true },
            { runValidators: true }
          );

          res.status(200).header({
            "content-type": "text/html",
          }).send(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>DD-Tech Hub</title>
          <link rel="icon" href="${process.env.herokuBaseUrl}/logo.png" />
        </head>
        <body>
          <div
            style="display: flex; width: 100%; height: 100%; flex-direction: row; justify-content: center;align-items: center;">
            <p>Email Verification Successful!</p>
          </div>
        </body>
        <script src="${process.env.herokuBaseUrl}/scripts/email.js"></script>
        </html>`);
        } catch (err) {
          res.status(404).header({
            "content-type": "text/html",
          }).send(`<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>DD-Tech Hub</title>
            <link rel="icon" href="${process.env.herokuBaseUrl}/logo.png" />
          </head>
          <body>
            <div
              style="display: flex; width: 100%; height: 100%; flex-direction: row; justify-content: center;align-items: center;">
              <p style="color:red;">Email Verification Falied!</p>
            </div>
          </body>
          </html>`);
        }
      });
    } catch (err) {
      res.status(404).header({
        "content-type": "text/html",
      }).send(`<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DD-Tech Hub</title>
        <link rel="icon" href="${process.env.herokuBaseUrl}/logo.png" />
      </head>
      <body>
        <div
          style="display: flex; width: 100%; height: 100%; flex-direction: row; justify-content: center;align-items: center;">
          <p style="color:red;">Email Verification Falied!</p>
        </div>
      </body>
      </html>`);
    }
  };
};
