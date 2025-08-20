import { Request, Response } from "express";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";
import { dbClasses, dbCourses, dbUsers } from "../../database/db-models";
import { capitalizeEachWord } from "../../utils/config";

export const createAClass = function () {
  return async (req: Request, res: Response) => {
    try {
      req.body.createdAt = Date.now();

      req.body.title = capitalizeEachWord(req.body.title);

      for (let teachers of req.body.teachers) {
        const user = await dbUsers.findById(teachers);

        if (user?.role !== "teacher") throw new Error("Invalid class teacher");
      }

      for (let courses of req.body.courses) {
        const course = await dbCourses.findById(courses);

        if (!course?._id) throw new Error("One or two more courses invalid.")
      }

      const done = await dbClasses.create(req.body);

      response(res, "Class Created!", done);
    } catch (err) {
      errorResponce(res, err.message || "Internal Server Error");
    }
  };
};
