import express, { Router } from "express";
import { validateDTOAgainstBody } from "../global-middlewares/validate-dto";
import { verifyToken } from "../security/verify-token";
import { CreateClassDTO } from "../model/classes/class-dto";
import { createAClass } from "../model/classes/create-a-class";
import { registerForAClass } from "../model/classes/register-for-a-class";
import { getClasses } from "../model/classes/get-classes";

const controller_slug = "classes";

export const ClassesController: Router = express.Router();

ClassesController.post(
  `/${controller_slug}/create`,
  verifyToken(["admin"]),
  validateDTOAgainstBody(CreateClassDTO),
  createAClass(),
);

ClassesController.patch(
  `/${controller_slug}/register/:classID/:studentID`,
  verifyToken(),
  registerForAClass(),
);

ClassesController.get(
  `/${controller_slug}/get`,
  verifyToken(),
  getClasses(),
);



