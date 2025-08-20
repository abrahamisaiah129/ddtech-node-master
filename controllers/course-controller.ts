import express, { Router } from "express";
import { validateDTOAgainstBody } from "../global-middlewares/validate-dto";
import { verifyToken } from "../security/verify-token";
import { CreateCourseDTO } from "../model/courses/course-dto";
import { createACourse } from "../model/courses/create-a-course";
import { getCourses } from "../model/courses/get-courses";
import { registerForACourse } from "../model/courses/register-for-a-course";
import { makeCourseProgress } from "../model/courses/make-course-progress";
import { getLearnersRanking } from "../model/courses/get-learners-ranking";

const controller_slug = "courses";

export const CourseController: Router = express.Router();

CourseController.post(
  `/${controller_slug}/create`,
  verifyToken(),
  validateDTOAgainstBody(CreateCourseDTO),
  createACourse(),
);

CourseController.get(
  `/${controller_slug}/get`,
  verifyToken(),
  getCourses(),
);

CourseController.patch(
  `/${controller_slug}/register/:studentID/:courseID`,
  verifyToken(),
  registerForACourse(),
);

CourseController.put(
  `/${controller_slug}/progress`,
  verifyToken(),
  makeCourseProgress(),
);

CourseController.get(
  `/${controller_slug}/ranking/:courseID`,
  verifyToken(["admin"]),
  getLearnersRanking(),
);


