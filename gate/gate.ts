import type { ErrorResponse, RequestMeta, GateRequest, Header } from "@types";
import stringify from "@utils/fast-json-stringfy";
import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosError,
  CancelToken,
} from "axios";

import axios from "axios";

let _boundary: string;
const getBoundary = () => {
  if (_boundary) return _boundary;
  let boundary = "--------------------------";
  for (let i = 0; i < 24; i++) {
    boundary += Math.floor(Math.random() * 10).toString(16);
  }

  _boundary = boundary;
  return _boundary;
};
const getHeaders = (userHeaders: Header) => {
  let header: string;
  const formHeaders: Header = {
    "content-type": "multipart/form-data; boundary=" + getBoundary(),
  };

  for (header in userHeaders) {
    if (Object.prototype.hasOwnProperty.call(userHeaders, header)) {
      formHeaders[header.toLowerCase()] = userHeaders[header];
    }
  }

  return formHeaders;
};
const fetchRequest = async <R, T = R>(
  client: AxiosInstance,
  req: AxiosRequestConfig,
  cancelToken: CancelToken
): Promise<T> => {
  try {
    const res = await client.request<T>({ ...req, cancelToken });

    return Promise.resolve(res.data);
  } catch (e) {
    const error = e as AxiosError<T>;
    // if(error.)
    if (error.response) {
      if (error.response.status === 500 || error.response.status === 400) {
        const res = error.response.data as any;
        return Promise.reject({
          error: {
            code: error.response.status,
            message: res && res.message ? res.message : error.message,
            details: error.response.statusText,
          },
        });
      } else if (
        error.response.status === 403 ||
        error.response.status === 401
      ) {
        const res = error.response.data as any;
        return Promise.reject({
          error: {
            code: error.response.status,
            message: res && res.message ? res.message : error.message,
            details: error.response.statusText,
          },
          unAuthorizedRequest: true,
        });
      } else {
        const res = error.response.data as any;

        const result: ErrorResponse<T> = {
          unAuthorizedRequest: false,
          error: {
            code: error.response.status,
            message: res && res.message ? res.message : error.message,
            details: error.response.statusText,
          },
        };
        return Promise.reject(result);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js

      const result: ErrorResponse<T> = {
        unAuthorizedRequest: false,
        faildRequest: true,
        error: {
          code: error.request.status,
          message: error.message,
          details: error.request.statusText,
        },
      };
      return Promise.reject(result);
    } else {
      // Something happened in setting up the request that triggered an Error
      const result: ErrorResponse<T> = {
        unAuthorizedRequest: false,
        __internal: true,
        canceled: true,
        error: {
          code: 0,
          message: error.message ? error.message : (e as string),
          details: error.stack ? error.stack : "",
        },
      };
      return Promise.reject(result);
    }
  }
};

function getRequestMeta<R, D, P>(req: GateRequest<D, P>): RequestMeta<R, D, P> {
  const { method, isForm, data, params, url, client, headers: _headers } = req;
  let headers: Header = {
    Accept: "application/json",
    ..._headers,
  };

  if (!isForm) {
    headers["Content-Type"] = "application/json";
  } else {
    headers = getHeaders(headers);
  }

  let p, d;

  if (data) d = data;
  if (params) p = params;
  if (method === "get" || method === "GET") {
    if (d) p = { ...p, ...d };
    d = undefined;
  }

  const cancelTokenSource = axios.CancelToken.source();
  const cancelToken = cancelTokenSource.token;

  const request: AxiosRequestConfig = {
    data: d,
    params: p,
    url,
    method,
    headers,
  };

  const res: RequestMeta<R, D, P> = {
    request,
    cancelToken,
    cancel: () => cancelTokenSource.cancel("canceled"),
    fetch: async () => fetchRequest<R>(client, request, cancelToken),
    page: async (r) => {
      return fetchRequest<R>(
        client,
        {
          ...request,
          params: {
            ...request.params,
            ...r,
          },
        },
        cancelToken
      );
    },
    key: () => stringify(request) || "",
  };
  return res;
}
function isEmpty(value: any) {
  const type = typeof value;
  if ((value !== null && type === "object") || type === "function") {
    const properties = Object.keys(value);
    return properties.length === 0;
  } else if (type === "string" && value.trim().length === 0) {
    return true;
  }
  return !value;
}
export function objectToFormData(obj: any, fd: FormData) {
  const formData = fd || new FormData();

  const isUndefined = (value: any) => value === undefined;
  const isObject = (value: any) => value === Object(value);
  const isArray = (value: any) => Array.isArray(value);
  const isBlob = (value: any) => {
    return (
      value != null &&
      typeof value.size === "number" &&
      typeof value.type === "string" &&
      typeof value.slice === "function"
    );
  };
  const isFile = (value: any) => {
    return (
      isBlob(value) &&
      typeof value.lastModified === "number" &&
      typeof value.name === "string"
    );
  };
  const isDate = (value: any) => value instanceof Date;

  if (isUndefined(obj) || !isObject(obj)) {
    return formData;
  }

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value === "SKIP_FIELD") {
      return;
    }
    if (isArray(value)) {
      value.forEach((entry: any) => {
        formData.append(key, entry);
      });
    } else if (
      isObject(value) &&
      !isEmpty(value) &&
      !isFile(value) &&
      !isDate(value)
    ) {
      objectToFormData(value, formData);
    } else {
      formData.append(key, value);
    }
  });

  return formData;
}
type RequiredProp<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  Required<Pick<T, K>>;
type GateMethodRequest<D, P> = Omit<GateRequest<D, P>, "method" | "isForm">;

const api = {
  delete: function <R = never, D = never, P = never>(
    req: GateMethodRequest<D, P>
  ) {
    return getRequestMeta<R, D, P>({ ...req, method: "DELETE" });
  },
  get: function <R = never, D = never, P = never>(
    req: GateMethodRequest<D, P>
  ) {
    return getRequestMeta<R, D, P>({ ...req, method: "GET" });
  },
  patch: function <R = never, D = never, P = never>(
    req: RequiredProp<GateMethodRequest<D, P>, "data">
  ) {
    return getRequestMeta<R, D, P>({ ...req, method: "PATCH" });
  },
  post: function <R = never, D = never, P = never>(
    req: GateMethodRequest<D, P>
  ) {
    return getRequestMeta<R, D, P>({ ...req, method: "POST" });
  },
  put: function <R = never, D = never, P = never>(
    req: RequiredProp<GateMethodRequest<D, P>, "data">
  ) {
    return getRequestMeta<R, D, P>({ ...req, method: "PUT" });
  },
  file: function <R = never, D = never, P = never>({
    data,
    ...rest
  }: RequiredProp<GateMethodRequest<D, P>, "data">) {
    const fd = new FormData();
    objectToFormData(data, fd);
    return getRequestMeta<R, FormData, P>({
      ...rest,
      data: fd,
      isForm: true,
      method: "POST",
    });
  },
};

export default api;
