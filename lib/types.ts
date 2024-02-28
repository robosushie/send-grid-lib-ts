type EmailType =
  | {
      email: string;
      name: string;
    }
  | string;

interface LogData {
  status: string;
  errorCode: number | null;
  errorMessage: string | null;
  sender: EmailType | null;
  receiver: EmailType[] | null;
  scheduled: any;
  subject: string | null;
  content: string | null;
}

type HeaderType = {
  id: string;
  title: string;
};

interface SendGridOptions {
  defaultSender: EmailType;
  logFilename: string;
  logLocation?: string;
}

export { EmailType, LogData, HeaderType, SendGridOptions };
