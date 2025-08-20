import { Response } from "express";

export const response = function (
  resObj: Response,
  status?: string,
  data?: any,
) {
  return resObj
    .status(200)
    .header({
      "content-type": "application/json",
    })
    .send({
      status: status || "Server success",
      data: data || "void",
    });
};
