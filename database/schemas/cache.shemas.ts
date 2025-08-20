import mongoose, { Document, Schema } from "mongoose";

export type TCacheType = {
  cache_category: "sms_token" | "session_storage" | "other_storage";
  cache_payload: any;
  createdAt: Date | number;
};

export interface ICache extends TCacheType, Document {}

export const CacheSchemas = new mongoose.Schema<TCacheType>({
  cache_category: {
    type: String,
    enum: {
      values: ["sms_token", "session_storage", "other_storage"],
      message: "Invalid cache category",
    },
    required: [true, "Cache category required"],
  },
  cache_payload: Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  //   expires: 300,
  // },
});
