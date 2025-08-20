import mongoose, { Document } from "mongoose";

export type TMeetings = {
  date: Date;
  link: string;
  instructions: string;
  duration: {
    value: number;
    unit: "min" | "hour";
  };
  platform: string;
};

export class ClassesTypes {
  students: any[];
  teachers: any[];
  chats: {
    user: any;
    createdAt: number | Date;
    messsage: string;
    image: string;
  }[];
  meetings: TMeetings[];
  createdAt: number | Date;
  description: string;
  courses: any[];
  title: string;
}

export interface IClasses extends ClassesTypes, Document {}

export const ClassesSchema = new mongoose.Schema<ClassesTypes>({
  students: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
  ],
  teachers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
  ],
  chats: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      messsage: {
        type: String,
        maxlength: 1000,
        default: "",
        required: true,
      },
      image: {
        type: String,
        default: "",
      },
    },
  ],
  meetings: [
    {
      date: {
        type: Date,
        default: Date.now(),
      },
      link: {
        type: String,
        required: true,
      },
      instructions: {
        type: String,
        maxLength: 1000,
        default: "",
      },
      duration: {
        value: {
          type: Number,
          default: 1,
          required: [true, "Duration is required for every classes"],
        },
        unit: {
          type: String,
          enum: {
            values: ["min", "hour"],
            message: "duration unit type invalid",
          },
          required: true,
        },
      },
      platform: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    default: "",
  },
  courses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "courses",
    },
  ],
  title: {
    type: String,
    maxLength: 1000,
    required: [true, "A class must have a name"],
  },
});

ClassesSchema.index({ title: 1 }, { unique: true });
