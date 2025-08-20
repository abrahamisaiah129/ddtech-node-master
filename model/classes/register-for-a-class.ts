import { Request, Response } from "express";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";
import { dbUsers, dbClasses } from "../../database/db-models";

export const registerForAClass = function () {
  return async (req: Request, res: Response) => {
    try {
      const theStudent = await dbUsers.findById(req.params.studentID);

      if (theStudent?.role !== "student") throw new Error("Only students can register for class");

      const theClass = await dbClasses.findById(req.params.classID);

      if (!theClass?._id) throw new Error("Invalid class");

      if (theClass?.students?.includes(theStudent?._id) || theStudent?.classes?.includes(theClass?._id)) throw new Error("Cannot register for this class");

      theClass.students?.push(theStudent?._id);

      theStudent.classes?.push(theClass?._id);

      await dbClasses.findByIdAndUpdate(req.params.classID, { students: theClass.students }, { runValidators: true });

      await dbUsers.findByIdAndUpdate(req.params.studentID, { classes: theStudent.classes }, { runValidators: true });

      response(res, "Class Registered For");
    } catch (err) {
      errorResponce(res, err.message || "Internal Server Error");
      console.log(err);
    }
  };
};
