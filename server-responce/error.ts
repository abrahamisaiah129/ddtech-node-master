import { Response } from "express";

const errorResponce = function (
  resObj: Response,
  message?: string,
  code?: any,
) {
  if (resObj?.writableEnded) return;
  return resObj
    .status(code || 404)
    .header({
      "content-type": "application/json",
    })
    .send({
      status: "Internal server error",
      message: message || "void",
    });
};

export { errorResponce };
