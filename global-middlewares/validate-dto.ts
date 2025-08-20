import { NextFunction, Request, Response } from "express";
import { ValidationError, validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { errorResponce } from "../server-responce/error";

export function validateDTOAgainstBody(dto: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const toClassBody = plainToClass(dto, req.body);

      const errors = await validate(toClassBody);

      if (errors.length) {
        const messages = errors
          .map((error: ValidationError) =>
            Object.values(error.constraints!).join(", "),
          )
          .join(" ------ ");

        throw new Error(messages);
      } else next();
    } catch (err) {
      errorResponce(res, err.message || "Internal Server Error");
    }
  };
}
