import express, { Router } from "express";
import { signupAUser } from "../model/auth/signup-user";
import { validateDTOAgainstBody } from "../global-middlewares/validate-dto";
import { FinishPasswordResetDTO, LoginBodyDto, SignupBodyDto } from "../model/auth/auth.dto";
import { loginAUser } from "../model/auth/login-user";
import { verifyToken } from "../security/verify-token";
import { getAwsSignedUrl } from "../utils/file/get-from-aws";
import { verifyPassKey } from "../security/verify-pass-key";
import { verifyIfEmailNotExists } from "../model/auth/test-email";
import { resendVerification } from "../model/auth/resend-verification-email";
import { initiatePasswordResert } from "../model/auth/initiate-password-reset";
import { finalChangePassword } from "../model/auth/finish-password-reset";
import { verifyCode } from "../model/auth/test-code";

const controller_slug = "auth";

export const AuthController: Router = express.Router();

AuthController.post(
  `/${controller_slug}/signup`,
  verifyPassKey(),
  validateDTOAgainstBody(SignupBodyDto),
  signupAUser(),
);

AuthController.post(
  `/${controller_slug}/login`,
  verifyPassKey(),
  validateDTOAgainstBody(LoginBodyDto),
  loginAUser(),
);

AuthController.get(
  `/file/aws/:folder/:filename`,
  verifyToken(),
  getAwsSignedUrl(),
);

AuthController.get(`/${controller_slug}/email/exists`, verifyIfEmailNotExists());

AuthController.get(`/${controller_slug}/resend/email`, resendVerification());

AuthController.post(`/${controller_slug}/password/initiate`, initiatePasswordResert());

AuthController.patch(
  `/${controller_slug}/password/complete`,
  validateDTOAgainstBody(FinishPasswordResetDTO),
  finalChangePassword()
);

AuthController.post(`/${controller_slug}/code/ver/:email`, verifyCode());


