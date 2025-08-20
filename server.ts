import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config({ path: "./config.env" });

import { hashPassword } from "./security/hash-passwords";
import { MainController } from "./controllers/main-controller";
import { errorResponce } from "./server-responce/error";
import { verifyKey } from "./security/verify-key";
import { verifyEmail } from "./model/auth/verify-email";

if (process.env.prod === "yes") {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`${process.env.appName} App Server started`);
  });
} else {
  app.listen(5500, () => {
    console.log(`${process.env.appName} Server started @ localhost port 5500`);
  });
}

mongoose
  .connect(process.env.mongodb as string)
  .then(() => {
    console.log(`${process.env.appName} Database Connected`);
  })
  .catch((err) => console.log(err));

app.use(morgan("combined"));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://dd-techhub.netlify.app",
      "https://www.dd-techhub.netlify.app",
      "https://dashboard.dd-techhub.com",
      "https://www.dashboard.dd-techhub.com",
      "https://classroom.dd-techhub.com",
      "https://www.classroom.dd-techhub.com",
      "https://dashboard.dd-techhub.com/",
      "http://localhost:5173",
    ],
  })
);
app.use(express.static("./public"));

app.use(hashPassword());

app.param("key", verifyKey());

app.use(`/${process.env.appName}/:key`, MainController);

app.get(`/email/ver/:token`, verifyEmail());

//fallback!
app.use((_req: Request, res: Response, _next: NextFunction) => {
  errorResponce(res, "No route found on this server -", 404);
});
