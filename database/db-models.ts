import { model } from "mongoose";
import { ISocket, SocketSchema } from "./schemas/socket.schema";
import { IUsers, UsersSchema } from "./schemas/user.schema";
import { ClassesSchema, IClasses } from "./schemas/classes-schema";
import { CoursesSchema, ICourses } from "./schemas/courses-schema";
import { CacheSchemas, ICache } from "./schemas/cache.shemas";

UsersSchema.post("save", async (obj: any, next: any) => {
  const body = {
    email: obj.email,
    userID: obj._id,
  };
  await dbSockets.create(body);

  next();
});

export const dbSockets = model<ISocket>("sockets", SocketSchema);
export const dbUsers = model<IUsers>("users", UsersSchema);
export const dbClasses = model<IClasses>("classes", ClassesSchema);
export const dbCourses = model<ICourses>("courses", CoursesSchema);
export const dbCache = model<ICache>("cache", CacheSchemas);
