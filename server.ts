import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { hashPassword } from "./security/hash-passwords";
import { MainController } from "./controllers/main-controller";
import { errorResponce } from "./server-responce/error";
import { verifyKey } from "./security/verify-key";
import { verifyEmail } from "./model/auth/verify-email";

// =========================
// Load environment variables
// =========================
// =========================
// Load environment variables
// =========================

dotenv.config({ path: "./config.env" });

// Debug log to ensure envs are loaded
console.log("DEBUG APP_NAME:", process.env.APP_NAME);
console.log("DEBUG PORT:", process.env.PORT);
console.log("DEBUG MONGODB_URI:", process.env.MONGODB_URI ? "Loaded ✅" : "❌ Missing");

const app = express();
const PORT = process.env.PORT || 8080; // fallback for local dev

// =========================
// Database Connection
// =========================
// =========================
// Database Connection
// =========================

if (!process.env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in config.env");
}

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log(`${process.env.APP_NAME} Database Connected`);
  })
  .catch((err) => console.error("DB Connection Error:", err));

// =========================
// Middlewares
// =========================
// =========================
// Middlewares
// =========================

app.use(morgan("combined"));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// =========================
// CORS Setup
// =========================
// =========================
// CORS Setup
// =========================

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
  "https://dd-techhub.netlify.app",
  "https://www.dd-techhub.netlify.app",
  "https://dashboard.dd-techhub.com",
  "https://www.dashboard.dd-techhub.com",
  "https://classroom.dd-techhub.com",
  "https://www.classroom.dd-techhub.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.static("./public"));


// =========================
// Routes
// =========================
// =========================
// Routes
// =========================

app.use(hashPassword());
app.param("key", verifyKey());
app.use(`/${process.env.APP_NAME}/:key`, MainController);
app.get(`/email/ver/:token`, verifyEmail());


// =========================
// =========================
// Fallback 404
// =========================
// =========================

app.use((_req: Request, res: Response, _next: NextFunction) => {
  errorResponce(res, "No route found on this server -", 404);
});


// =========================
// Start Server
// =========================
// =========================
// Start Server
// =========================

app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME} Server started on port ${PORT}`);
});
