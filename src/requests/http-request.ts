import axios from "axios";

export enum HttpRequestType {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type HttpHeadersMap = {
  [key: string]: string;
};

export const createHttpRequestHeaders = async (
  extraHeaders?: HttpHeadersMap
) => {
  let headers: HttpHeadersMap;
  if (extraHeaders) {
    headers = extraHeaders;
    if (!headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }
  return headers;
};

export const httpRequest = async (
  type: HttpRequestType,
  url: string,
  params: any,
  data: any,
  extraHeaders?: HttpHeadersMap
) => {
  const headers = await createHttpRequestHeaders(extraHeaders);
  let response: any;

  if (type === HttpRequestType.GET) {
    response = await axios.get(url, { params, headers });
  } else if (type === HttpRequestType.POST) {
    response = await axios.post(url, data, { headers });
  } else if (type === HttpRequestType.PATCH) {
    response = await axios.patch(url, data, { headers });
  } else if (type === HttpRequestType.PUT) {
    response = await axios.put(url, data, { headers });
  } else if (type === HttpRequestType.DELETE) {
    response = await axios.delete(url, { params, headers });
  } else {
    response = {};
  }

  return response;
};
