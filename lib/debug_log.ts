// @ts-ignore
import fs from "fs";
// @ts-ignore
import path from "path";

import { createObjectCsvWriter } from "csv-writer";
import { LogData, HeaderType } from "./types";

class DebugLog {
  private filename: string;
  private filepath: string;
  private file: string;
  private header: HeaderType[];
  private csvWriter: any;

  constructor(filename: string, filepath: string) {
    this.filename = filename;
    this.filepath = filepath;
    this.file = path.join(this.filepath, this.filename);
    this.header = [
      { id: "timestamp", title: "Timestamp" },
      { id: "status", title: "Status" },
      { id: "errorCode", title: "ErrorCode" },
      { id: "errorMessage", title: "ErrorMessage" },
      { id: "sender", title: "Sender" },
      { id: "receiver", title: "Receiver" },
      { id: "scheduled", title: "Scheduled" },
      { id: "subject", title: "Subject" },
      { id: "content", title: "Content" },
    ];

    if (!this.checkFilePath()) {
      const titles = this.header.map((header) => header.title).join(",");
      fs.mkdirSync(this.filepath, { recursive: true });
      fs.writeFileSync(this.file, titles + "\n");
    }
    this.createCSVWriter();
  }

  public checkFilePath = (): boolean => {
    try {
      fs.accessSync(this.file, fs.constants.F_OK);
      return true;
    } catch (err) {
      return false;
    }
  };

  public async log(
    data: LogData = {
      status: "Success",
      errorCode: null,
      errorMessage: null,
      sender: null,
      receiver: null,
      scheduled: null,
      subject: null,
      content: null,
    }
  ): Promise<void> {
    const timestamp = new Date().toISOString();
    const logData = this.createLogData(data);
    const logEntry = { timestamp: timestamp, ...logData };
    try {
      await this.csvWriter.writeRecords([logEntry]); // Wrap logEntry in an array
    } catch (err) {
      throw new Error("Failed to write CSV file");
    }
    // fs.appendFileSync(this.file, logEntry + "\n");
  }

  private createLogData(obj: any) {
    const newObj: any = {};

    for (const [key, value] of Object.entries(obj)) {
      if (
        (typeof value === "object" || Array.isArray(value)) &&
        value !== null
      ) {
        newObj[key] = JSON.stringify(value);
      } else if (value === null || value === undefined) {
        newObj[key] = "";
      } else {
        newObj[key] = value;
      }
    }

    return newObj;
  }

  private createCSVWriter(): void {
    this.csvWriter = createObjectCsvWriter({
      path: this.file,
      header: this.header,
      append: true,
    });
    // fs.writeFileSync(this.file, this.headers.join(",") + "\n");
  }
}

export default DebugLog;
