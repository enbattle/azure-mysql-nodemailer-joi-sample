import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
  app,
} from "@azure/functions";
import { EventCategories, logErrorEvent } from "../shared/logger/logger";
import { checkHttpProtocolController } from "../function-helpers/http-protocol.controller";
import { HttpCallTypes, HttpCallTypesList } from "../shared/enums/http.enum";
import { HttpAuthLevel } from "../shared/enums/http-auth.enum";
import { checkAllowedRequestController } from "../function-helpers/http-request.controller";
import { buildHttpResponse } from "../shared/http/http";

export async function SampleFunction(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const eventCategory = EventCategories.SAMPLE_ISSUES;

  let response: any;

  try {
    // Check correct HTTP protocol
    checkHttpProtocolController(context, request, eventCategory);

    // Check correct HTTP request type
    const allowedRequests = [HttpCallTypes.GET];
    checkAllowedRequestController(
      context,
      request,
      eventCategory,
      allowedRequests,
      request.method
    );

    // Validate request headers, body, params, etc.

    // Run main code portion...
  } catch (error: any) {
    if (error.statusCode) {
      response = error;
      logErrorEvent(JSON.stringify(response), context, request, eventCategory);
    } else {
      response = buildHttpResponse(500, {});
      logErrorEvent(JSON.stringify(response), context, request, eventCategory);
      context.log(error);
    }
  }

  return {
    status: response.statusCode,
    jsonBody: response,
  };
}

app.http("sample-function", {
  methods: HttpCallTypesList,
  authLevel: HttpAuthLevel.ANONYMOUS,
  route: "sample-function",
  handler: SampleFunction,
});
