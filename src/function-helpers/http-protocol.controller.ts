import { HttpRequest, InvocationContext } from "@azure/functions";
import {
  EventCategories,
  logErrorEvent,
  logInfoEvent,
} from "../shared/logger/logger";
import { HttpResponseType, buildHttpResponse } from "../shared/http/http";

export const localHostNames = ["localhost", "127.0.0.1", "::1"];

export function checkHttpProtocolController(
  context: InvocationContext,
  request: HttpRequest,
  eventCategory: EventCategories
) {
  let response: HttpResponseType;
  const host = request?.headers?.get?.("host");

  let foundLocalHost = false;
  for (const hostName of localHostNames) {
    if (host?.includes(hostName)) {
      foundLocalHost = true;
      break;
    }
  }

  if (!foundLocalHost) {
    const isolateRequestProtocol = request?.url?.split("://");
    if (isolateRequestProtocol.length >= 1) {
      const protocol = isolateRequestProtocol[0];

      logInfoEvent(
        "Current HTTP protocol: " + protocol,
        context,
        request,
        eventCategory
      );

      if (protocol === "https") {
        response = buildHttpResponse(200, {});
        logInfoEvent(
          response.message || "Correct HTTP protocol found.",
          context,
          request,
          eventCategory
        );
      } else {
        response = buildHttpResponse(500, {});
        logErrorEvent(
          response.message || "Invalid HTTP protocol found.",
          context,
          request,
          eventCategory
        );
      }
    } else {
      response = buildHttpResponse(500, {});
      logErrorEvent(
        response.message || "Invalid HTTP protocol found.",
        context,
        request,
        eventCategory
      );
      throw response;
    }
  }
}
