import express, { Router } from "express";
import { verifyToken } from "../security/verify-token";
import { getUser } from "../model/users/get-users";
import { validateDTOAgainstBody } from "../global-middlewares/validate-dto";
import { EditUserDTO, UpdateUserAppSettingsDTO } from "../model/users/user.dto";
import { upload } from "../utils/file/upload";
import { updateProfilePictureOfUser } from "../model/users/upload-profile-picture";
import { editUser } from "../model/users/edit-user";
import { sendNotificationToOneOrMoreUsers } from "../model/users/send-a-notification";
import { markNotificationAsRead } from "../model/users/mark-notification-as-read";
import { updateUserAppSettings } from "../model/users/update-user-settings";

const controller_slug = "users";

export const UserController: Router = express.Router();

UserController.get(
  `/${controller_slug}/get/:userID?`,
  verifyToken(),
  getUser(),
);

//update profile picture
UserController.patch(
  `/${controller_slug}/profile/pic/:id`,
  verifyToken(),
  upload.single("photo"),
  updateProfilePictureOfUser(),
);

//edit a user
UserController.patch(
  `/${controller_slug}/profile/edit/:id`,
  verifyToken(),
  validateDTOAgainstBody(EditUserDTO),
  editUser(),
);

//send notifications to one or more users
UserController.post(
  `/${controller_slug}/notifications/send`,
  verifyToken(["admin"]),
  sendNotificationToOneOrMoreUsers()
);

//mark notification as read
UserController.patch(
  `/${controller_slug}/notifications/read/:userID/:notificationID?`,
  verifyToken(),
  markNotificationAsRead()
);

//edit a user
UserController.patch(
  `/${controller_slug}/settings/update/:id`,
  verifyToken(),
  validateDTOAgainstBody(UpdateUserAppSettingsDTO),
  updateUserAppSettings()
);