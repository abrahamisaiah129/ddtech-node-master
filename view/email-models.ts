import { sendMail } from "../emailer/emailer";
import { baseEmailCodeString } from "./emit-code-email";
import { baseEmailString } from "./emit-email";

export function sendVerifyEmail(
  recipient: string,
  userName: string,
  linkText: string,
  linkHref: string
) {
  const optionsVerifyEmail = {
    from: "info@d-degreedigital.com",
    to: recipient,
    subject: "Verify Your Email",
    html: baseEmailString(
      userName,
      `Welcome to DD-Tech Hub.<br><br>Please verify your email using the button/link below to get started!`,
      {
        text: linkText,
        link: linkHref,
      }
    ),
  };

  sendMail(optionsVerifyEmail);
}

export function sendPasswordResetEmail(recipient: string, userName: string, code: string) {
  const options = {
    from: "info@d-degreedigital.com",
    to: recipient,
    subject: "Password Reset",
    html: baseEmailCodeString(userName, code),
  };

  sendMail(options);
}

export function sendEmailNotification(
  recipient: string,
  userName: string,
  title: string,
  body: string,
  linkText?: string,
  linkHref?: string
) {
  const optionToSendEmail = {
    from: "info@d-degreedigital.com",
    to: recipient,
    subject: title,
    html: baseEmailString(
      userName,
      body,
      linkHref &&
        linkText && {
          text: linkText,
          link: linkHref,
        }
    ),
  };

  sendMail(optionToSendEmail);
}
