import { Request, Response } from "express";
import { errorResponce } from "../../server-responce/error";
import { response } from "../../server-responce/success";


import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../aws/client"

const getAwsSignedUrl = function () {
  return async (req: Request, res: Response) => {
    try {
      const filename = req.params.filename;
      const folder = req.params.folder;

      const command = new GetObjectCommand({
        Bucket: process.env.awsBucketName,
        Key: `${folder}/${filename}`,
      });

      const url = await getSignedUrl(s3, command, { expiresIn: 9000 });

      response(res, "Request File Found", url);
    } catch (err) {
      errorResponce(res, err.message || "Internal Server Error", 404);
    }
  };
};

export { getAwsSignedUrl };
