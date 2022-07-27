import type { RequestMeta } from "@types";
import type { Middleware } from "swr";
import stringify from "./fast-json-stringfy";

const isRequestMeta = (obj: any) =>
  !!obj && typeof obj === "object" && obj.hasOwnProperty("key");

export const serialize: Middleware = (useSWRNext) => {
  return (key, fetcher, config) => {
    let serializedKey = key;
    let req: any = null;

    if (isRequestMeta(key)) {
      serializedKey = (key as any).key();
      req = key;
    } else if (Array.isArray(key)) {
      if (key.length > 0 && isRequestMeta(key[0])) {
        const [_req, ...others] = key;
        req = _req;
        serializedKey = stringify([req.key(), ...others]);
      } else {
        serializedKey = stringify(key);
        req = null;
      }
    } else {
      serializedKey = key;
      req = null;
    }
    // Pass the serialized key, and unserialize it in fetcher.

    return useSWRNext(
      serializedKey,
      fetcher && req ? () => fetcher(req) : fetcher,
      config
    );
  };
};

export const fetcher: <T, D, P>(
  req: RequestMeta<T, D, P>
) => Promise<T> = async (req) => {
  if (isRequestMeta(req)) return req.fetch();
  return Promise.reject("invalid request handler");
};
