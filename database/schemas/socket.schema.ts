import mongoose, { Document } from "mongoose";

export class SocketTypes {
  email: string;
  userID: any;
  online: boolean;
  socketID: string;
}

export interface ISocket extends SocketTypes, Document {}

export const SocketSchema = new mongoose.Schema<SocketTypes>({
  email: {
    type: String,
    required: [true, "Socket username must be present"],
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: [true, "user ID must be present in socket"],
  },
  socketID: {
    type: String,
    default: "",
  },
  online: { type: Boolean, default: false },
});
