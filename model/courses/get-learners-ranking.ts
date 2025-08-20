import { Request, Response } from "express";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";
import { dbCourses, dbUsers } from "../../database/db-models";
import { UsersType } from "../../database/schemas/user.schema";
import { TCourseTracker } from "../users/user.dto";
import { sortArray } from "../../utils/config";

export const getLearnersRanking = function () {
  return async (req: Request, res: Response) => {
    try {
      const start = dbCourses.findById(req.params?.courseID).populate({ path: "students" });

      const course = await start;

      let allStudentsOnCourseAndThierProgressTracker = [];

      course.students?.forEach((e: UsersType & { _id: string }) => {
        const fetchOutTheCoursesOwn = e.courses_tracker.filter((tracker: TCourseTracker) => {
          return String(tracker?.course) == String(course?._id);
        });

        allStudentsOnCourseAndThierProgressTracker = [...allStudentsOnCourseAndThierProgressTracker, ...JSON.parse(JSON.stringify(fetchOutTheCoursesOwn))?.map((data: any) => {
          data.userData = e;
          return data;
        })];
      })

      allStudentsOnCourseAndThierProgressTracker = sortArray(allStudentsOnCourseAndThierProgressTracker);

      response(res, "See Ranking", allStudentsOnCourseAndThierProgressTracker);
    } catch (err) {
      errorResponce(res, err.message || "Internal Server Error");
    }
  };
};
