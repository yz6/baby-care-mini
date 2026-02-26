export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "OPTIONS"
  | "HEAD"
  | "TRACE"
  | "CONNECT";

export type HttpRequestData = string | object | ArrayBuffer;

export interface HttpRequestOptions<TData = HttpRequestData> {
  url: string;
  method?: HttpMethod;
  data?: TData;
  header?: Record<string, string>;
}

export interface ApiError {
  code: number | string;
  message: string;
  detail?: unknown;
}

export interface ApiResponse<T> {
  data: T;
}
