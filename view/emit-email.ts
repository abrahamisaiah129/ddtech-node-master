const baseEmailString = function (
  userName: string,
  body: string,
  link?: { text: string; link: string }
) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DD-Tech Hub</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Sora:wght@400&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
    />
    <style>
      body,
      table,
      td,
      a {
        font-family: "Sora", sans-serif;
      }

      table {
        border-spacing: 0;
        width: 100%;
        max-width: 600px;
        border-collapse: collapse;
        margin: auto;
      }

      .code-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        width: 100%;
      }

      .code-container td {
        background: #efeef3;
        color: #151a20;
        width: 40px;
        text-align: center;
        height: 40px;
        font-size: 24px;
        font-weight: 600;
        border-radius: 5px;
      }

      .social-icons {
        border-top: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        color: #3d4c5e;
        text-align: center;
        font-size: 10px;
        font-weight: 400;
        text-wrap: wrap;
        width: 90%;
        margin-top: 20px;
        padding: 10px;
      }

      .social-icons a {
        text-decoration: none;
      }

      .welcome-text {
        color: #1d242d;
        text-align: center;
        font-size: 24px;
        font-weight: 500;
        line-height: 32px;
        padding-top: 20px;
      }

      .welcome-message {
        color: var(--Text-Colours-Text-20, #3d4c5e);
      }

      .introduction {
        color: #47586e;
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
      }

      .login-details {
        color: #3d4c5e;
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        line-height: 30px;
      }

      .details {
        margin-top: 20px;
      }

      .ignore {
        color: #47586e;
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
      }

      .regards {
        color: #47586e;
        text-align: center;
        font-size: 14px;
        line-height: 22px;
      }

      .dd-team {
        color: #47586e;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
      }

      .copywrite {
        color: #000;
        text-align: center;
        font-size: 10px;
        font-weight: 400;
        margin-top: 10px;
      }

      .disclaimer {
        color: #3d4c5e;
        text-align: center;
        font-size: 10px;
        font-weight: 400;
        text-wrap: wrap;
        width: 90%;
        margin-top: 10px;
      }

      .footer-links {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
      }

      .footer-links a {
        color: #151a20;
        text-align: center;
        font-size: 10px;
        font-weight: 600;
        text-decoration-line: underline;
      }

      .product {
        color: #47586e;
        text-align: center;
        flex: 1;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
      }

      .btn-primary a {
        background-color: #ec3b35;
        border-color: #ec3b35;
        color: white;
        text-decoration: none;
        padding: 12px;
        border-radius: 8px;
      }

      .btn-primary table td:hover {
        background-color: #ec3b35 !important;
      }
      .btn-primary a:hover {
        background-color: #ec3b35 !important;
        border-color: #ec3b35 !important;
      }
      .btn-primary table td {
        background-color: #ec3b35;
        padding: 12px;
        border-radius: 8px;
      }
    </style>
  </head>

  <body>
    <center>
      <table>
        <td colspan="2" style="text-align: center">
          <!-- SVG logo -->
          <img src="${process.env.herokuBaseUrl}/logo.png" alt="DD-Tech Hub" />
        </td>
        <tr>
          <td class="welcome-text" style="text-align: center; padding-bottom: 20px">
            Hi ${userName}!
          </td>
        </tr>

        <tr>
          <td class="introduction" style="padding-bottom: 20px">${body}</td>
        </tr>
        <tr>
          <td>
            <center>
              <table
                class="btn btn-primary"
                align="center"
                style="padding-bottom: 20px; border-collapse: separate; border-spacing: 15px 0"
              >
                <tr style="text-align: center" align="center">
                  <td>
                    <a href="${link?.link ? link?.link : process.env.frontendUrl}" target="_blank"
                      >${link?.text ? link?.text : "Explore DD-Tech"}</a
                    >
                  </td>
                </tr>
              </table>
            </center>
          </td>
        </tr>
        <tr>
          <td class="regards" style="text-align: center">Best,</td>
        </tr>
        <tr>
          <td
            class="dd-team"
            style="text-align: center; padding-bottom: 20px; padding-bottom: 20px"
          >
            The DD-Tech Hub team
          </td>
        </tr>
        
        <tr>
          <td class="copywrite" style="text-align: center; padding-top: 10px">
            © 2024 D-Degree Digital Ltd, DD-Tech Hub. All rights reserved.
          </td>
        </tr>
        <tr>
          <td class="disclaimer" style="text-align: center; padding-top: 20px">
            You are receiving this mail because you registered to one of D-Degree's platform. This
            also shows that you agree to our Terms of use and Privacy Policies. If you no longer
            want to receive mails from us, click the unsubscribe link below to unsubscribe.
          </td>
        </tr>
       <tr>
          <td class="disclaimer" style="text-align: center; padding-top: 10px; color: #151a20">
            <a
              style="font-size: 10px; color: #151a20; text-decoration-line: underline"
              href="https://dd-techhub.com/courses-page-one"
              >Courses</a
            >
            &nbsp; &nbsp;
            <a
              style="font-size: 10px; color: #151a20; text-decoration-line: underline"
              href="https://d-degreedigital.com"
              >Subsidiaries</a
            >
            &nbsp; &nbsp;
            <a
              style="font-size: 10px; color: #151a20; text-decoration-line: underline"
              href="https://dd-techhub.com/contact"
              >Help Center</a
            >
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`;
};

export { baseEmailString };
