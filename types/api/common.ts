import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  CancelToken,
  Method,
} from "axios";
import type { Key } from "swr";

export type Header = Record<string, string>;

export interface GateRequest<D, P> {
  client: AxiosInstance;
  method: Method;
  url: string;
  data?: D;
  params?: P;
  isForm?: boolean;
  headers?: Header;
}

export type GateMethodRequest<D, P> = Omit<
  GateRequest<D, P>,
  "method" | "isForm"
>;

export interface RequestMeta<T, D, P> {
  request: AxiosRequestConfig;
  cancelToken: CancelToken;
  cancel: (message?: string | undefined) => void;
  fetch: () => Promise<T>;
  page: (req: Pick<GateRequest<D, P>, "data" | "params">) => Promise<T>;
  key: () => string;
}
export type ValidationError<T> = {
  members: (keyof T)[];
  message: string;
};
export type ErrorMeta<T = unknown> = {
  code: number;
  details: string;
  message: string;
  validationErrors?: ValidationError<T>[] | null;
};

export type ErrorResponse<T = never> = {
  error: ErrorMeta<T>;
  unAuthorizedRequest: boolean;
  canceled?: boolean;
  __internal?: boolean;
  faildRequest?: boolean;
  stack?: AxiosError<any>;
};

type Args<R, D, P> = RequestMeta<R, D, P> | null | undefined | false;

type K<R, D, P> = Args<R, D, P> | (() => Args<R, D, P>);

export type ReqKey<R, D, P> = K<R, D, P> | [K<R, D, P>, ...Key[]] | [];
