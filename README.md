# SendGridEmail Library Documentation

## Overview
The `SendGridEmail` is a simplified library which provides a convenient way to send emails using the SendGrid API. It allows you to send emails with various configurations, including setting the default sender, scheduling emails, and logging email activities to a CSV file.

## Installation
To use the `SendGridEmail` library, you need to have Node.js installed on your machine. Install the following dependencies and copy the contents of `lib` folder inside your library:
```
npm install @sendgrid/mail csv-writer
```

## Usage

### Importing the Library
```
import SendGridEmail from "./lib/send_grid";
```
### Creating an Instance
To create an instance of `SendGridEmail`, you need to provide your SendGrid API key and options object:
```
const sendGrid = new SendGridEmail(apiKey, {
  defaultSender: { email: "your-email@example.com", name: "Your Name" },
  logFilename: "email_log.csv",
  logLocation: "./logs",
});
```
The `apiKey` is a string that represents your SendGrid API key. This key is used to authenticate your requests to the SendGrid API, allowing you to send emails through SendGrid's email delivery platform. You can obtain your API key from the SendGrid dashboard.
```
apiKey = "<your-api-key>"
apiKey = process.end.API_KEY
```
The defaultSender is an object that represents the default sender of your emails. It supports two types of data formats.
```
defaultSender = { email: "<sender-email>", name: "<sender-name>" }
```
```
defaultSender = "<sender-email>"
```
The `logFilename` is a string that specifies the name of the CSV file where email activity logs will be stored. This file will contain information such as the timestamp, status, error code, error message, sender, receiver, scheduled time, subject, and content of each email sent using the `SendGridEmail` library.

The `logLocation` is a string that specifies the location where the log file will be stored. This can be a relative or absolute path to a directory on your file system. If the directory specified by logLocation does not exist, it will be created automatically when you instantiate the `SendGridEmail` class.

### Sending an Email
You can send an email using the `sendEmail` method. Provide the recipients, subject, content, and optionally, the HTML content and additional options:
```
sendGrid.sendEmail(recipients, subject, content, htmlContent, options)
  .then(() => {
    console.log("Email sent successfully.");
  })
  .catch((error) => {
    console.error("Error sending email:", error);
  });
```

### Scheduling an Email
You can schedule an email to be sent at a later time using the `scheduleEmail` method. Provide the recipients, subject, date, time, content, and optionally, the HTML content and additional options:
```
sendGrid.scheduleEmail(recipients, subject, date, time, content, htmlContent, options)
  .then(() => {
    console.log("Email scheduled successfully.");
  })
  .catch((error) => {
    console.error("Error scheduling email:", error);
  });
```

### Arguments
`subject`
- Type: string
- Description: The subject of the email.

`content`
- Type: string
- Description: The main content of the email.

`date`
- Type: string
- Description: Date to schedule the email in "YYYY-MM-DD" format.

`time`
- Type: string
- Description: Date to schedule the email in 24 hour "HH:MM-SS" format.

`htmlContent` (optional)
- Type: string
- Description: The HTML-formatted content of the email. This is optional and can be used to send emails with rich formatting.

`options` (optional)
- Type: object
- Description: Additional options for sending the email.

  Properties:
  - `from` (optional): Specifies the sender of the email. It can be either an object with email and name properties or a string representing the email address. If provided, it overrides the default sender set in the SendGridEmail instance.
    ```
    from = { email: "<from-email>", name: "<from-name>" }
    from = "<from-email>"
    ```
  
  - `reply_to_list` (optional): A list of email addresses to receive replies to the email. It can be an array of objects with email and name properties or an array of strings representing email addresses.
    ```
    reply_to_list = [{ email: "<email>", name: "<name>" }]
    reply_to_list = ["<email>"]
    ```
  
  - `cc` (optional): A list of email addresses to be included in the CC (carbon copy) of the email. It can be an array of objects with email and name properties or an array of strings representing email addresses.
    ```
    cc = [{ email: "<email>", name: "<name>" }]
    cc = ["<email>"]
    ```
  
  - `bcc` (optional): A list of email addresses to be included in the BCC (blind carbon copy) of the email. It can be an array of objects with email and name properties or an array of strings representing email addresses.
    ```
    bcc = [{ email: "<email>", name: "<name>" }]
    bcc = ["<email>"]
    ```
  
  - `attachments` (optional): An array of attachments to be included with the email. Each attachment should be an object with the following properties:
    - `content`: The content of the attachment, encoded as base64.
    - `filename`: The filename of the attachment.
    - `type`: The MIME type of the attachment.

### Logging Email Activities
The `SendGridEmail` library logs email activities to a CSV file. The log file is created automatically if it does not exist. Each log entry contains the timestamp, status, error code, error message, sender, receiver, scheduled time, subject, and content of the email.

### Example
Here's a complete example demonstrating how to use the `SendGridEmail` library to send an email:
```
import SendGridEmail from "./lib/send_grid";

const apiKey = process.env.SEND_GRID_API_KEY;
const defaultSender = { email: "your-email@example.com", name: "Your Name" };
const recipients = [{ email: "recipient@example.com", name: "Recipient Name" }];
const subject = "Test Email";
const content = "This is a test email sent using SendGrid.";
const htmlContent = "<p>This is a test email sent using SendGrid.</p>";

const sendGrid = new SendGridEmail(apiKey, {
  defaultSender,
  logFilename: "email_log.csv",
  logLocation: "./logs",
});

sendGrid.sendEmail(recipients, subject, content, htmlContent)
  .then(() => {
    console.log("Email sent successfully.");
  })
  .catch((error) => {
    console.error("Error sending email:", error);
  });
```

### Conclusion
The `SendGridEmail` library simplifies the process of sending emails using SendGrid, allowing you to focus on creating engaging content for your recipients. It provides flexibility in configuring email settings and offers logging capabilities for tracking email activities.

