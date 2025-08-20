import nodemailer from "nodemailer";

const sendMail = function (emailOBJ: any) {
  const transport = nodemailer.createTransport({
    host: process.env.mailHost,
    port: process.env.mailPort,
    auth: {
      user: process.env.mailUser,
      pass: process.env.mailPass,
    },
    secure: false,
  } as any);

  // const transport = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   auth: {
  //     user: "demario27@ethereal.email",
  //     pass: "eYY378JY9CAS82hns5",
  //   },
  // });

  transport
    .sendMail(emailOBJ)
    .then(() => {
      console.log("Email sent");
    })
    .catch((err) => console.log(err));
};

export { sendMail };
