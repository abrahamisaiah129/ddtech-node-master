import mongoose, { Document } from "mongoose";
import * as validator from "validator";
import { notificationTypeOptions } from "../../utils/config";

export type TUserRoles = "student" | "admin" | "teacher" | "other";

export type TCourseTrackers = {
  course: any;
  progress?: number;
  current_topic?: string;
  topics_resolved?: string[];
};

export type TUnionUserPaymentForType = "learning" | "tools" | "admission" | "course" | "others";

export type TUnionUserPaymentStatus = "pending" | "completed" | "cancelled";

export type TUserPayments = {
  payment_for: TUnionUserPaymentForType;
  initiated_on: number | Date;
  status: TUnionUserPaymentStatus;
  paymentRef: object;
  amount: number;
  paymentMethod: string;
};

export type TANotification = {
  _id?: any;
  title: string;
  message: string;
  createdAt: Date | number;
  is_read?: boolean;
  notification_type: "normal" | "broadcasts" | "security" | "account" | "feature" | "wallet";
};

export type TSettingsOptions = "Profile_Visibility" | "Login_Alerts";

export type TSettingsObjRecord = Record<TSettingsOptions, boolean>;

export class UsersType {
  first_name: string;
  last_name: string;
  role: TUserRoles;
  email: string;
  student_number: string;
  profile_picture: string;
  password: string;
  about: string;
  mobile: string;
  address: {
    addressString: string;
    geoLocation: any;
    postCode: string;
  };
  payments: TUserPayments[];
  login_token: {
    token_id: string;
    token: string;
  };
  courses: any[];
  classes: any[];
  createdAt: number | Date;
  is_active: boolean;
  courses_tracker: TCourseTrackers[];
  is_email_verified: boolean;
  notifications: TANotification[];
  settings: TSettingsObjRecord;
}

export interface IUsers extends UsersType, Document {}

export const UsersSchema = new mongoose.Schema<UsersType>({
  first_name: {
    type: String,
    trim: true,
    maxlength: 100,
    required: [true, "A user must have a first name"],
  },
  last_name: {
    type: String,
    maxlength: 100,
    trim: true,
    required: [true, "A user must have a last name"],
  },
  login_token: {
    token_id: {
      type: String,
      maxlength: 5,
      default: "",
      select: false,
    },
    token: {
      type: String,
      default: "",
      select: false,
    },
  },
  is_email_verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: {
      values: ["student", "admin", "teacher", "other"],
      message: "Role type invalid",
    },
    required: true,
  },
  email: {
    type: String,
    validate: validator.isEmail,
    required: [true, "Email must be present"],
    lowercase: true,
  },
  student_number: {
    type: String,
    trim: true,
    maxlength: 200,
    required: [true, "A user must have a card number"],
  },
  profile_picture: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  about: {
    type: String,
    default: "",
    maxlength: 500,
  },
  mobile: {
    type: String,
    maxlength: 15,
    trim: true,
    required: [true, "A mobile number must have a name"],
  },
  address: {
    addressString: String,
    geoLocation: {
      type: {
        type: String,
        default: "point",
        enum: ["point"],
      },
      coordinates: [String],
    },
    postCode: String,
  },
  payments: [
    {
      payment_for: {
        type: String,
        enum: {
          values: ["learning", "tools", "admission", "course", "others"],
          message: "payment type invalid",
        },
        required: true,
      },
      initiated_on: {
        type: Date,
        default: Date.now(),
      },
      status: {
        type: String,
        enum: {
          values: ["pending", "completed", "cancelled"],
          message: "Transaction type invalid",
        },
        required: [true, "All transactions must have a status"],
      },
      paymentRef: Object,
      amount: {
        type: Number,
        min: 1,
        required: [true, "A transaction must have an amount"],
      },
      paymentMethod: {
        type: String,
        required: [true, "Payment method is required for all transactions"],
      },
    },
  ],
  courses: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "courses",
    },
  ],
  classes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "classes",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  courses_tracker: [
    {
      course: {
        type: mongoose.Schema.ObjectId,
        ref: "courses",
      },
      progress: {
        type: Number,
        default: 0,
      },
      current_topic: {
        type: String,
        default: "",
      },
      topics_resolved: [
        {
          type: String,
        },
      ],
    },
  ],
  notifications: [
    {
      title: {
        type: String,
        required: true,
        maxlength: 100,
      },
      message: {
        type: String,
        required: true,
        maxlength: 500,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      is_read: {
        type: Boolean,
        default: false,
      },
      notification_type: {
        type: String,
        enum: {
          values: notificationTypeOptions,
          message: "Invalid notification type",
        },
        default: "normal",
      },
    },
  ],
  settings: {
    Profile_Visibility: { type: Boolean, default: false },
    Login_Alerts: { type: Boolean, default: false },
  },
});

UsersSchema.index({ email: 1 }, { unique: true });
UsersSchema.index({ student_number: 1 }, { unique: true });
