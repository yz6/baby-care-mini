import type { ApiError, HttpRequestData, HttpRequestOptions } from "../types/http";

const BASE_URL = "";
const DEFAULT_TIMEOUT = 15000;

export function httpRequest<TResponse, TData extends HttpRequestData = HttpRequestData>(
  options: HttpRequestOptions<TData>
): Promise<TResponse> {
  const { url, method = "GET", data, header = {} } = options;

  return new Promise<TResponse>((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header,
      timeout: DEFAULT_TIMEOUT,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as TResponse);
          return;
        }

        reject({
          code: res.statusCode,
          message: "请求失败，请稍后重试"
        } as ApiError);
      },
      fail: (err) => {
        reject({
          code: "NETWORK_ERROR",
          message: "网络异常，请检查网络连接",
          detail: err
        } as ApiError);
      }
    });
  });
}
