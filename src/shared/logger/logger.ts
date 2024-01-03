import { HttpRequest, InvocationContext } from "@azure/functions";
import { v4 as uuidv4 } from "uuid";

/**
 * Functionality is based off of Azure Invocation Context (can be switched for other serverless contexts)
 */

export enum LogLevel {
  ERROR = "ERROR",
  INFO = "INFO",
  WARNING = "WARNING",
  DEBUG = "DEBUG",
}

export enum EventCategories {
  SAMPLE_ISSUES = "Sample issues",
  NOTIFICATION_ISSUES = "Notification issues",
  LOGIN_ISSUES = "Login Issues",
  VALIDATION_ISSUES = "Validation Issues",
}

export const logBaseEvent = (
  logLevel: LogLevel,
  message: string,
  context: InvocationContext,
  request: HttpRequest,
  eventCategory: EventCategories
) => {
  const event = {
    logLevel,
    message,
    request,
    eventDate: new Date(),
    eventId: uuidv4,
    eventCategory,
  };

  context.log(JSON.stringify(event));
};

export const logInfoEvent = (
  message: string,
  context: InvocationContext,
  request: HttpRequest,
  eventCategory: EventCategories
) => {
  logBaseEvent(LogLevel.INFO, message, context, request, eventCategory);
};

export const logErrorEvent = (
  message: string,
  context: InvocationContext,
  request: HttpRequest,
  eventCategory: EventCategories
) => {
  logBaseEvent(LogLevel.ERROR, message, context, request, eventCategory);
};
