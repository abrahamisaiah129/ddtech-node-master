import { NextFunction, Request, Response } from "express";
import { errorResponce } from "../server-responce/error";

export function verifyPassKey() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.pass) throw new Error("Invalid Pass -P");

      if (req.headers.pass !== process.env.passKey) throw new Error("Invalid Auth -P");

      next();
    } catch (err) {
      errorResponce(res, err.message || "Invalid Pass -P");
    }
  };
}
