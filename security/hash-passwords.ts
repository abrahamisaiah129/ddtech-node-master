import * as bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";

export function hashPassword() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body.password) return next();

      const hashed = await bcrypt.hash(req.body.password, 12);

      req.body.password = hashed;

      return next();
    }
    catch {
      console.log("Error hashing pass")
    }
  };
}
