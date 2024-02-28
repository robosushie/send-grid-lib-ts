import dotenv from "dotenv";
dotenv.config();

// Import SendGridEmail Library
import SendGridEmail from "./lib/send_grid";

// const apiKey = <your-api-key>
const apiKey = process.env.SEND_GRID_API_KEY;

// Define the default sender
const defaultSender = { email: "sushant@dreatexr.com", name: "Sushant" };

// Define the recipient
const recipients = [
  { email: "samuel.sushant714@gmail.com", name: "Sushant" },
  { email: "ssamuel.sachin@gmail.com", name: "Sachine" },
];

// Define the email content
const subject = "Test Email5";
const content = "This is a test email sent using SendGrid.";
const htmlContent = "<p>This is a test email sent using SendGrid.</p>";

// Create an instance of SendGridEmail
const sendGrid = new SendGridEmail(apiKey, {
  defaultSender,
  logFilename: "email_log.csv",
  logLocation: "./logs",
});

// Send the email
sendGrid
  .sendEmail(recipients, subject, content, htmlContent)
  .then(() => {
    console.log(
      "Email sent successfully. Recipients should receive the email in a few minutes."
    );
  })
  .catch((error) => {
    console.error("Error sending email:", error);
  });

// Send the email
sendGrid
  .sendEmail(recipients, subject, content, htmlContent, {
    bcc: ["ssamuel@ee.iitr.ac.in"],
    cc: ["sushantsamuel23@gmail.com"],
  })
  .then(() => {
    console.log(
      "Email sent successfully. Recipients should receive the email in a few minutes."
    );
  })
  .catch((error) => {
    console.error("Error sending email:", error);
  });

// sendGrid
//   .scheduleEmail(
//     recipients,
//     subject,
//     "2024-02-28",
//     "06:35:00",
//     content,
//     htmlContent
//   )
//   .then(() => {
//     console.log("Email scheduled successfully.");
//   })
//   .catch((error) => {
//     console.error("Error scheduling email:", error);
//   });
