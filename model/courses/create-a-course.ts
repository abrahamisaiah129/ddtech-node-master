import { Request, Response } from "express";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";
import { dbCourses, dbUsers } from "../../database/db-models";
import { capitalizeEachWord } from "../../utils/config";

export const createACourse = function () {
  return async (req: Request, res: Response) => {
    try {

      req.body.name = capitalizeEachWord(req.body.name);
      req.body.category = capitalizeEachWord(req.body.category);

      for (let teachers of req.body.teachers) {
        const user = await dbUsers.findById(teachers);

        if (user?.role !== "teacher") throw new Error("Invalid course teacher");
      }

      req.body.resources = req.body.resources?.map((e: any) => {
        e.createdAt = Date.now();
        return e;
      })

      req.body.createdAt = Date.now();

      const done = await dbCourses.create(req.body);

      response(res, "Course Created", done);
    } catch (err) {
      errorResponce(res, err.message || "Internal Server Error");
    }
  };
};
