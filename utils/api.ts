import type { RequestMeta } from "@types";

export async function resolveAndMapFallbackDataAsync<
  T extends RequestMeta<any, never, never>[]
>(...params: T) {
  const res = await Promise.all(params.map((m) => m.fetch()));

  return params.reduce<{ [key: string]: any }>((prev, curr, idx) => {
    return { ...prev, [curr.key()]: res[idx] };
  }, {});
}
