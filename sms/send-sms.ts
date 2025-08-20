import SibApiV3Sdk from "sib-api-v3-sdk";

export const sendAnSMSBrevo = async function name(recipient: string, content: string) {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env?.brevo_api_key;

    const apiInstance = new SibApiV3Sdk.TransactionalSMSApi();
    const sendTransacSms = new SibApiV3Sdk.SendTransacSms();

    sendTransacSms.sender = "DD-Tech";
    sendTransacSms.recipient = recipient;
    sendTransacSms.content = content;

    const data = await apiInstance.sendTransacSms(sendTransacSms);

    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const sendAnSMStermii = async function name(recipient: string, content: string) {
  try {
    const response = await fetch("https://api.termii.com/api/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: process.env?.termii_api_key,
        to: recipient,
        from: "N-Alert",
        sms: content,
        type: "plain",
        channel: "dnd",
      }),
    });

    console.log(response);

    if (!Boolean(response.ok)) throw new Error();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
