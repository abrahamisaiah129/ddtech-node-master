import { Request, Response } from "express";
import { dbCourses } from "../../database/db-models";
import { response } from "../../server-responce/success";
import { errorResponce } from "../../server-responce/error";
import { capitalizeEachWord, selectUserData } from "../../utils/config";

export const getCourses = function () {
  return async (req: Request, res: Response) => {
    try {
      if (req.query.id) {
        const start = dbCourses
          .findById(req.query.id)
          .populate({ path: "teachers", select: selectUserData })
          .populate({ path: "students" })

        const course = await start;

        response(res, "Found course by ID", course);
      } else if (req.query.name) {
        const start = dbCourses
          .findOne({ name: capitalizeEachWord(String(req?.query?.name)?.split(",")?.join(" ")) })
          .populate({ path: "teachers", select: selectUserData })
          .populate({ path: "students", select: selectUserData })

        const course = await start;

        response(res, "Found course by Name", course);
      } else if (req.query.category) {
        const start = dbCourses
          .find({ category: capitalizeEachWord(String(req?.query?.category)?.split(",")?.join(" ")) })
          .populate({ path: "teachers", select: selectUserData })
          .populate({ path: "students", select: selectUserData })

        const course = await start;

        response(res, "Found course(s) by category", course);
      } else {
        const start = dbCourses
          .find()
          .populate({ path: "teachers", select: selectUserData })
          .populate({ path: "students", select: selectUserData })

        const course = await start;

        response(res, "Returning any and all courses in the DB", course);
      }
    } catch (err) {
      errorResponce(res, "course not found", 404);
    }
  };
};
