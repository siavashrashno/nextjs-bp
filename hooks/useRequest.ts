import type { ErrorResponse, ReqKey } from "@types";
import type { Fetcher, SWRConfiguration } from "swr";

import useSWR from "swr";

export default function useRequest<
  R extends unknown = unknown,
  D extends never = never,
  P extends never = never
>(
  meta: ReqKey<R, D, P>,
  config?:
    | SWRConfiguration<R, ErrorResponse<D & P>, Fetcher<R, ReqKey<R, D, P>>>
    | undefined
) {
  return useSWR(meta, config);
}
