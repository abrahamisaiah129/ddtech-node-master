import { Request, Response } from "express";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";
import { dbCourses, dbUsers } from "../../database/db-models";

export const registerForACourse = function () {
  return async (req: Request, res: Response) => {
    try {
      const theStudent = await dbUsers.findById(req.params.studentID);

      if (theStudent?.role !== "student") throw new Error("Only students can register for courses");

      const theCourse = await dbCourses.findById(req.params.courseID)

      if (!theCourse?._id) throw new Error("Invalid course");

      if (theCourse?.students?.includes(theStudent?._id) || theStudent?.courses?.includes(theCourse?._id)) throw new Error("Cannot register for this course");

      theCourse.students?.push(theStudent?._id);

      theStudent.courses?.push(theCourse?._id);

      theStudent.courses_tracker?.push({
        course: theCourse?._id
      });

      await dbCourses.findByIdAndUpdate(req.params.courseID, { students: theCourse.students }, { runValidators: true });

      await dbUsers.findByIdAndUpdate(req.params.studentID, { courses: theStudent.courses, courses_tracker: theStudent.courses_tracker }, { runValidators: true });

      response(res, "Course Registered For");
    } catch (err) {
      errorResponce(res, err.message || "Internal Server Error");
    }
  };
};
