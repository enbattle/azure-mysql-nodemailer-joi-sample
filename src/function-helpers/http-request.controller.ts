import { HttpRequest, InvocationContext } from "@azure/functions";
import {
  EventCategories,
  logErrorEvent,
  logInfoEvent,
} from "../shared/logger/logger";

export function checkAllowedRequestType(
  allowedRequests: string[],
  requestMethod: string
): boolean {
  if (allowedRequests.includes(requestMethod)) {
    return true;
  } else {
    return false;
  }
}

export function checkAllowedRequestController(
  context: InvocationContext,
  request: HttpRequest,
  eventCategory: EventCategories,
  allowedRequests: string[],
  requestMethod: string
) {
  const areRequestsAllowed = checkAllowedRequestType(
    allowedRequests,
    requestMethod
  );

  if (!areRequestsAllowed) {
    logErrorEvent(
      "HTTP request method(s) are valid.",
      context,
      request,
      eventCategory
    );
    return false;
  } else {
    logInfoEvent(
      "HTTP request method(s) are valid.",
      context,
      request,
      eventCategory
    );
    return true;
  }
}
