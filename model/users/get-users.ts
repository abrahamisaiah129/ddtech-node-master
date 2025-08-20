import { Request, Response } from "express";
import { dbUsers } from "../../database/db-models";
import { response } from "../../server-responce/success";
import { errorResponce } from "../../server-responce/error";

export const getUser = function () {
  return async (req: Request, res: Response) => {
    try {
      if (req.params.userID) {
        const start = dbUsers
          .findById(req.params.userID)
          .populate({ path: "courses" })
          .populate({ path: "classes" })

        const user = await start;

        response(res, "Found User by ID", user);
      } else if (req.query.student_number) {
        const start = dbUsers
          .findOne({ student_number: req.query.student_number })
          .populate({ path: "courses" })
          .populate({ path: "classes" })

        const user = await start;

        response(res, "Found User by Student Number", user);
      } else if (req.query.email) {
        const start = dbUsers
          .findOne({ email: req.query.email })
          .populate({ path: "courses" })
          .populate({ path: "classes" })

        const user = await start;

        response(res, "Found User by email", user);
      } else if (req.query.role) {
        const start = dbUsers
          .find({ role: req.query.role })
          .populate({ path: "courses" })
          .populate({ path: "classes" })

        const user = await start;

        response(res, "Found Users by role", user);
      } else {
        const start = dbUsers
          .find()
          .populate({ path: "courses" })
          .populate({ path: "classes" })

        const user = await start;

        response(res, "Returning any and all users in the DB", user);
      }
    } catch (err) {
      console.log(err)
      errorResponce(res, "User not found", 404);
    }
  };
};
