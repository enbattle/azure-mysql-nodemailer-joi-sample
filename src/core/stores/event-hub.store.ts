import crypto from "crypto";
import { makeAutoObservable } from "mobx";
import { isHydrated, makePersistable } from "mobx-persist-store";

const algorithm = process.env.NEXT_PUBLIC_COOKIE_ENC_ALGORITHM || "";
const key = process.env.NEXT_PUBLIC_COOKIE_ENC_KEY || "";

// Encryption function
const encrypt = (data: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key, "utf-8"),
    iv
  );

  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + "+" + encrypted;
};

// Decryption function
const decrypt = (data: string) => {
  const textParts = data.split(":");
  const iv = Buffer.from(textParts.shift()!, "hex"); // Extract IV
  const encryptedText = textParts.join(":");

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key, "utf-8"),
    iv
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted.toString(); // Return decrypted data
};

export default class EventHubLogStore {
  maxEventHubLogsQueueSize = 10;
  eventHubLogsQueue: string[] = [];

  constructor() {
    this.initializeVariables();
  }

  initializeVariables() {
    makeAutoObservable(this);

    if (typeof window !== "undefined") {
      if (!isHydrated(this)) {
        makePersistable(this, {
          name: "EventHubStore",
          properties: ["maxEventHubLogsQueueSize", "eventHubLogsQueue"],
        });
      }
    }
  }

  getEventHubLogsQueue() {
    const decryptedEventLogs = this.eventHubLogsQueue.map(
      (encryptedEventLog) => {
        const decryptedEventLog = decrypt(encryptedEventLog);
        return JSON.parse(decryptedEventLog);
      }
    );

    return decryptedEventLogs;
  }

  addToEventHubLogsQueue(eventLog: any) {
    const eventLogString = JSON.stringify(eventLog);
    const encryptedEventLog = encrypt(eventLogString);
    this.eventHubLogsQueue.push(encryptedEventLog);

    if (this.eventHubLogsQueue.length > this.maxEventHubLogsQueueSize) {
      this.sendEventHubLogsToDatabase();
      this.clearEventHubLogsQueue();
    }
  }

  sendEventHubLogsToDatabase() {
    // Send events to database
  }

  clearEventHubLogsQueue() {
    this.eventHubLogsQueue = [];
  }

  hydrate(eventHubLogStore?: EventHubLogStore) {
    Object.assign(this, eventHubLogStore);
  }
}
