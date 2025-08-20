import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { ITokenObj } from "../interfaces/interfaces";
import { TUserRoles } from "../database/schemas/user.schema";
import { errorResponce } from "../server-responce/error";

export function verifyToken(role?: TUserRoles[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.token && !req?.cookies?.token) throw new Error("Invalid Passport -T");

      jwt.verify(
        req.headers.token as string || req?.cookies?.token as string,
        process.env.jwtkey as string,
        (err: any, obj: ITokenObj) => {
          if (err) throw new Error("Invalid Auth -T");

          if (role && !role.includes(obj?.role)) throw new Error("No Access Here -T");

          req["user"] = obj;
          next();
        },
      );
    }
    catch (err) {
      errorResponce(res, err.message || "Invalid Auth -T")
    }
  };
}
