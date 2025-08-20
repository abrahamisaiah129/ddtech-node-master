import { Request, Response } from "express";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";
import { dbCourses, dbUsers } from "../../database/db-models";
import { calculateCompletionPercentage } from "../../utils/config";
import { TTopic } from "./course-dto";
import { TCourseTracker } from "../users/user.dto";

export const makeCourseProgress = function () {
  return async (req: Request, res: Response) => {
    try {
      const theStudent = await dbUsers.findById(req.body?.studentID);

      if (theStudent?.role !== "student") throw new Error("Only students can register for courses");

      const theCourse = await dbCourses.findById(req.body?.courseID);

      if (!theCourse?._id) throw new Error("Invalid course");

      const topicIn: TTopic = theCourse?.resources?.find((e: TTopic) => String(e?._id) == req.body?.topicIn);

      if (!topicIn) throw new Error("Invalid Topic");

      const foundCourseInStudentCourseTracker = theStudent?.courses_tracker?.find((e: TCourseTracker) => String(e?.course) == theCourse?._id);

      if (!foundCourseInStudentCourseTracker) throw new Error("Course tracker failed!")

      foundCourseInStudentCourseTracker.current_topic = topicIn?._id;

      if (foundCourseInStudentCourseTracker?.topics_resolved?.includes(req.body?.topicIn)) throw new Error("Topic Already Resolved");

      foundCourseInStudentCourseTracker.topics_resolved.push(topicIn?._id);

      foundCourseInStudentCourseTracker.progress = calculateCompletionPercentage(JSON.parse(JSON.stringify(theCourse?.resources))?.map((e: TTopic) => {
        if (foundCourseInStudentCourseTracker?.topics_resolved?.includes(e?._id)) {
          e.is_completed = true;
          return e;
        }
        else {
          e.is_completed = false;
          return e;
        }
      }));

      theStudent.courses_tracker = theStudent?.courses_tracker?.map((e: TCourseTracker) => {
        if (String(e?.course) == theCourse?._id) return foundCourseInStudentCourseTracker
        else return e;
      });

      const allDone = await dbUsers.findByIdAndUpdate(req.body?.studentID, { courses_tracker: theStudent.courses_tracker }, { runValidators: true, new: true });

      response(res, "Progress Recorded", allDone);
    } catch (err) {
      console.log(err);
      errorResponce(res, err.message || "Internal Server Error");
    }
  };
};
