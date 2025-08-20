import { Request, Response } from "express";
import { dbClasses } from "../../database/db-models";
import { response } from "../../server-responce/success";
import { errorResponce } from "../../server-responce/error";
import { capitalizeEachWord, selectUserData } from "../../utils/config";

export const getClasses = function () {
  return async (req: Request, res: Response) => {
    try {
      if (req.query.id) {
        const start = dbClasses
          .findById(req.query.id)
          .populate({ path: "teachers", select: selectUserData })
          .populate({ path: "students", select: selectUserData })
          .populate({ path: "courses" })

        const classs = await start;

        response(res, "Found classs by ID", classs);
      } else if (req.query.title) {
        const start = dbClasses
          .findOne({ title: capitalizeEachWord(String(req?.query?.title)?.split(",")?.join(" ")) })
          .populate({ path: "teachers", select: selectUserData })
          .populate({ path: "students", select: selectUserData })
          .populate({ path: "courses" })

        const classs = await start;

        if (!classs?._id) throw new Error("Class Not Found!");

        response(res, "Found classs by Name", classs);
      } else {
        const start = dbClasses
          .find()
          .populate({ path: "teachers", select: selectUserData })
          .populate({ path: "students", select: selectUserData })
          .populate({ path: "courses" })

        const classs = await start;

        response(res, "Returning any and all classes in the DB", classs);
      }
    } catch (err) {
      errorResponce(res, "class not found", 404);
    }
  };
};
