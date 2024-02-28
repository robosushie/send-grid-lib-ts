import sgMail from "@sendgrid/mail";
import DebugLog from "./debug_log";
import { EmailType, SendGridOptions } from "./types";

class SendGridEmail {
  private defaultSender: EmailType;
  private logLocation: string;
  private logger: DebugLog; // Uncomment if needed

  constructor(apiKey: string | any, options: SendGridOptions) {
    sgMail.setApiKey(apiKey);
    this.defaultSender = options.defaultSender;
    console.log(this.defaultSender);
    this.logLocation = options.logLocation || "./";
    this.logger = new DebugLog(options.logFilename, this.logLocation);
  }

  public async sendEmail(
    to: EmailType[],
    subject: string,
    content: string,
    htmlContent?: any,
    options?: {
      from?: EmailType;
      reply_to_list?: EmailType[];
      cc?: EmailType[];
      bcc?: EmailType[];
      attachments?: any;
    }
  ): Promise<void> {
    try {
      const msg = {
        to,
        from: options && options.from ? options.from : this.defaultSender,
        subject,
        text: content,
        html: htmlContent,
        ...options,
      };

      await sgMail.send(msg);
      await this.logger.log({
        status: "Success",
        errorCode: 200,
        errorMessage: null,
        sender: this.defaultSender,
        receiver: to,
        scheduled: null,
        subject: subject,
        content: content,
      });
      console.log("Email sent successfully:", msg);
    } catch (error: any) {
      await this.logger.log({
        status: "Failure",
        errorCode: error.code,
        errorMessage: error.response.body.errors[0].message,
        sender: this.defaultSender,
        receiver: to,
        scheduled: null,
        subject: subject,
        content: content,
      });
      console.log(error);
      console.error(
        "Error sending email:",
        error.code,
        error.response.body.errors[0].message
      );
      throw new Error("Failed to send email");
    }
  }

  public async scheduleEmail(
    to: EmailType[],
    subject: string,
    dateString: string,
    timeString: string,
    content: string,
    htmlContent?: any,
    options?: {
      from?: EmailType;
      reply_to_list?: EmailType[];
      cc?: EmailType[];
      bcc?: EmailType[];
      attachments?: any;
    }
  ): Promise<void> {
    const dateTimeString = [dateString, timeString].join("T");
    const unixTimestamp = new Date(dateTimeString).getTime() / 1000;
    try {
      const msg = {
        to,
        from: options && options.from ? options.from : this.defaultSender,
        subject,
        text: content,
        html: htmlContent,
        send_at: unixTimestamp,
        ...options,
      };

      await sgMail.send(msg);
      await this.logger.log({
        status: "Success",
        errorCode: 200,
        errorMessage: null,
        sender: this.defaultSender,
        receiver: to,
        scheduled: dateTimeString,
        subject: subject,
        content: content,
      });
      console.log("Email sent successfully:", msg);
    } catch (error: any) {
      const dateTimeString = [dateString, timeString].join("T");
      await this.logger.log({
        status: "Failure",
        errorCode: error.code,
        errorMessage: error.response.body.errors[0].message,
        sender: this.defaultSender,
        receiver: to,
        scheduled: dateTimeString,
        subject: subject,
        content: content,
      });
      console.log(error);
      console.error(
        "Error sending email:",
        error.code,
        error.response.body.errors[0].message
      );
      throw new Error("Failed to send email");
    }
  }
}

export default SendGridEmail;
