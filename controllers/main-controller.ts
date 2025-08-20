import express, { Router } from "express";
import { AuthController } from "./auth-controller";
import { UserController } from "./user-controller";
import { ClassesController } from "./classes-controller";
import { CourseController } from "./course-controller";

export const apiVersion = process.env.apiVersion;
export const baseUrl = process.env.base_url;

export const MainController: Router = express.Router();

//slug for controllers must always be after the app version;
MainController.use(`/api/${baseUrl}/${apiVersion}`, AuthController);
MainController.use(`/api/${baseUrl}/${apiVersion}`, UserController);
MainController.use(`/api/${baseUrl}/${apiVersion}`, ClassesController);
MainController.use(`/api/${baseUrl}/${apiVersion}`, CourseController);
