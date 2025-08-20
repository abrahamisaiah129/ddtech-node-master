import { NextFunction, Request, Response } from "express";
import { errorResponce } from "../server-responce/error";
import { payStackConfig } from "../model/paystack-models/config";

export function verifyPaystakRef() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const reference = req.body?.paymentRef?.reference;

    if (!reference || req.body?.paymentMethod !== "paystack") return next();

    const paystackReturned = await (
      await fetch(`${payStackConfig?.base_url}/transaction/verify/${reference}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.paystack_secret_key}`,
        },
      })
    ).json();

    console.log(paystackReturned);

    if (!Boolean(paystackReturned?.status))
      return errorResponce(res, "Something went wrong -", 401);

    if (paystackReturned?.data?.status !== "success") {
      console.log(paystackReturned?.data?.status, "---for---", req["user"]["email"]);
      return errorResponce(res, "Something went wrong --", 401);
    }

    if (paystackReturned?.data?.customer?.email !== req["user"]["email"])
      return errorResponce(res, "Something went wrong ---", 401);

    //put back when live
    if (paystackReturned?.data?.domain !== "live")
      return errorResponce(res, "Something went wrong ----", 401);

    req["paystackRef"] = paystackReturned?.data;

    next();
  };
}
