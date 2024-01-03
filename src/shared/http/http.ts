export type HttpResponseType = {
  statusCode?: number;
  result?: any;
  message?: string;
  friendlyMessage?: string;
};

export type HttpStatusResponseType = {
  responseCode: number;
  httpMessage: string;
  friendlyMessage: string;
};

// These are generic response codes and messages (to be used as reference)
// Implement response codes and messages that align with your own application
export function getHttpStatusResponse(
  statusId: number
): HttpStatusResponseType | undefined {
  const httpStatusResponse = {
    200: {
      responseCode: 200,
      httpMessage: "OK: Request Succeeded.",
      friendlyMessage: "",
    },
    201: {
      responseCode: 201,
      httpMessage: "Created: Request was successful and resource was created.",
      friendlyMessage: "",
    },
    202: {
      responseCode: 202,
      httpMessage:
        "Accepted: Request was successful, processing will continue asynchronously.",
      friendlyMessage: "",
    },
    204: {
      responseCode: 204,
      httpMessage:
        "No Content: API successful, but there is no response to be returned from the API",
      friendlyMessage:
        "It looks like there's no information available for your request. Please try a different query or request.",
    },
    400: {
      responseCode: 400,
      httpMessage:
        "Bad Request: Parameters in request where invalid or request payload structure was invalid. Do not retry.",
      friendlyMessage:
        " Oops! Your request is missing some important information or contains errors. Please double-check your request and try again.",
    },
    401: {
      responseCode: 401,
      httpMessage:
        "Unauthorized: Caller is not authorized to either call the specific API or perform the actio nrequest. Do not retry.",
      friendlyMessage:
        "Access Denied! You don't have the permission to access this content. Please log in or check your credentials.",
    },
    403: {
      responseCode: 403,
      httpMessage: "Forbidden: Caller is not allowed access. Do not retry.",
      friendlyMessage:
        "Access Forbidden! You don't have permission to view this content. If you believe this is an error, please contact support.",
    },
    404: {
      responseCode: 404,
      httpMessage: "Not Found: API does not exist. Do not retry.",
      friendlyMessage:
        "Oops! The page or resource you're looking for couldn't be found. Please check the URL and try again.",
    },
    408: {
      responseCode: 408,
      httpMessage:
        "Request Timeout: The request took too long to be sent to the server. Okay to retry using exponential backoff pattern.",
      friendlyMessage:
        "Oops! It seems like there was a delay in processing your request, and the server had to give up waiting. Please check your internet connection and try your request again. If the issue persists, consider contacting our support team for assistance.",
    },
    409: {
      responseCode: 409,
      httpMessage:
        "Conflict: A concurrency error occurred between two API calls. Okay to retry using exponential backoff pattern.",
      friendlyMessage:
        "Sorry, but here's a conflict with your request. It appears that someone else has already made changes to this resource, or there's a conflicting operation in progress. Please review your request and try again. If you continue to encounter issues, consider contacting our support team for assistance.",
    },
    413: {
      responseCode: 413,
      httpMessage:
        "Payload Too Large: The request is larger than the server is allowed to handle. Do not retry. If unexpected, contact support.",
      friendlyMessage:
        "Oops! Your request was too large for us to handle. Please check the size of the data you're sending and try again with a smaller request. If you need assistance or have questions, feel free to contact our support team.",
    },
    414: {
      responseCode: 414,
      httpMessage:
        "URI Too Long: The URI in the request is longer than the server is allowed to handle. Do not retry.",
      friendlyMessage:
        "Oops! It seems that the web address you provided is too long for us to process. Please check the URL and make sure it's not too lengthy. If you continue to experience this issue, please contact our support team for assistance.",
    },
    429: {
      responseCode: 429,
      httpMessage:
        'Too Many Request: API calls are being rate limited. Pause and then retry request, check if API returned "Retry-After" header or retryAfter in JSON response for delay needed.',
      friendlyMessage:
        "Hold on! It looks like you've been quite active. Our servers are currently processing a high volume of requests, and we need a moment to catch up. Please wait a bit and try your request again. If you encounter this issue repeatedly, consider reducing the frequency of your requests or contacting our support team for assistance.",
    },
    500: {
      responseCode: 500,
      httpMessage:
        "Internal Server Error: An error occurred on the server. Okay to retry, contact support if problem persists.",
      friendlyMessage:
        "Something went wrong on our end. We apologize for the inconvenience. Our team has been notified, and we're working to fix it.",
    },
    501: {
      responseCode: 501,
      httpMessage:
        "Not Implemented: The API called has not been implemented yet. Do not retry.",
      friendlyMessage:
        "We apologize, but the feature you're trying to use is not currently available. Our team is continuously working to imporve our services, and this particular feature has not been implemented yet. Please check back in the future for updates or contact our support team if you have any questions or need assistance with a different request.",
    },
    502: {
      responseCode: 502,
      httpMessage:
        "Bad Gateway: Servers are not available to process the request. Pause and then retry request using exponential backoff pattern.",
      friendlyMessage:
        "We're sorry, but we're experiencing some technicaly difficulties right now. Our servers are having trouble communicating with each other. Please wait a moment and try your request again. If the problem persists, feel free to contact our support team for assistance.",
    },
    503: {
      responseCode: 503,
      httpMessage:
        "Service Unavailable: Servers are not available to process the request. Pause and then retry request using exponential backoff pattern.",
      friendlyMessage:
        "Sorry, we're temporarily unable to serve your request. Please try again later. Our team is working on it.",
    },
    504: {
      responseCode: 504,
      httpMessage:
        "Gateway Timeout: Servers are not avialable to process the request. Pause and then retry request.",
      friendlyMessage:
        "Uh-oh! The server is taking too long to respond. Please check your internet connection and try again later.",
    },
    default: undefined,
  };

  return (
    httpStatusResponse[statusId as keyof typeof httpStatusResponse] ||
    httpStatusResponse["default"]
  );
}

export function buildHttpResponse(
  statusId: number,
  result: any
): HttpResponseType {
  const httpResponse = getHttpStatusResponse(statusId);

  const response = {
    statusCode: httpResponse?.responseCode,
    result: result,
    message: httpResponse?.httpMessage,
    friendlyMessage: httpResponse?.friendlyMessage,
  };

  return response;
}
