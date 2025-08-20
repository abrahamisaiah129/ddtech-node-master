import { Request, Response } from "express";
import { dbUsers } from "../../database/db-models";
import { response } from "../../server-responce/success";
import { errorResponce } from "../../server-responce/error";
import sharp from "sharp";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../utils/aws/client";

export const updateProfilePictureOfUser = function () {
  return async (req: Request, res: Response) => {
    try {
      if (!req?.file) throw new Error("Please attach a file");

      if (
        req?.file.mimetype !== "image/png" &&
        req?.file.mimetype !== "image/jpeg" &&
        req?.file.mimetype !== "image/jpg"
      )
        throw new Error("Please attach a valid file");

      if (req.params.id === ":id") throw new Error("User ID param needed");

      const user = await dbUsers.findByIdAndUpdate(req.params.id);

      if (!user?.first_name) throw new Error("User not found");

      const filename = `user-${user._id}-${user.first_name}-${user.first_name}-profile-photo-${Date.now()}.jpeg`;

      const buffer = await sharp(req.file.buffer)
        .resize(400)
        .toFormat("jpeg")
        .jpeg({ quality: 80 })
        .toBuffer();

      const command = new PutObjectCommand({
        Key: `profile-pictures/${filename}`,
        Bucket: process.env.awsBucketName,
        Body: buffer,
      });

      await s3.send(command);

      const done = await dbUsers.findByIdAndUpdate(
        req.params.id,
        { profile_picture: filename },
        { runValidators: true, new: true }
      );

      response(res, "Profile Picture Updated", done);
    } catch (err) {
      errorResponce(res, err.message || "Patient not found", 404);
    }
  };
};
