import { NextFunction, Request, Response } from "express";
import { errorResponce } from "../server-responce/error";

export function verifyKey() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.params.key !== process.env.apiKey)
        throw new Error("Invalid Auth -K");
      next();
    } catch (err) {
      errorResponce(res, err.message || "Invalid Auth -K")
    }
  };
}
