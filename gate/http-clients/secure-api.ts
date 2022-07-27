import type { ErrorResponse } from "@types";

import axios from "axios";
import auth from "../api/auth";

import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_LOCALE_KEY,
  COOKIE_REFRESH_TOKEN_KEY,
} from "@utils/constants";
import { getCookie, getLocale } from "@utils/Cookies";
import { isServer } from "@utils/helpers";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  responseType: "json",
});

client.defaults.timeout = 10000;

let interceptorId = -1;

client.interceptors.request.use(
  async function (config) {
    const Cookies = getCookie();
    const token = Cookies.get(COOKIE_ACCESS_TOKEN_KEY);

    if (!config.headers) config.headers = {};
    if (!config.headers["Accept-Language"])
      config.headers["Accept-Language"] =
        getLocale() || Cookies.get(COOKIE_LOCALE_KEY);
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    config.headers[
      process.env.NODE_ENV === "development" ? "Checknext" : "Nextjs"
    ] = true;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

let refreshTokenPromise: Promise<string> | null = null;

// const refreshToken = Cookies.get(COOKIE_REFRESH_TOKEN_KEY);
const reGetToken = async (refreshToken: string): Promise<string> => {
  const res = await auth.refresh({ refreshToken }).fetch();
  const token = res.result.accessToken || "";
  const Cookies = await getCookie();
  Cookies.set(COOKIE_ACCESS_TOKEN_KEY, token);
  return token;
};

export function setClientAuthInterceptorCallbak(callback?: () => void) {
  if (isServer() && interceptorId >= 0) return;
  if (interceptorId >= 0) client.interceptors.response.eject(interceptorId);

  interceptorId = client.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      const Cookies = await getCookie();
      if (error.response?.status === 401) {
        const refreshToken = Cookies.get(COOKIE_REFRESH_TOKEN_KEY);
        if (refreshToken) {
          if (!refreshTokenPromise) {
            refreshTokenPromise = reGetToken(refreshToken);
          }
          try {
            const accessToken = await refreshTokenPromise;
            client.defaults.headers.common["Authorization"] =
              "Bearer " + accessToken;
            return client(originalRequest);
          } catch (error) {
            const err = error as ErrorResponse;
            if (err.error.code === 403 || err.error.code === 401) {
              Cookies.remove(COOKIE_REFRESH_TOKEN_KEY);
            }
            return Promise.reject(err.error.details ? err.error.details : err);
          } finally {
            refreshTokenPromise = null;
            callback?.();
          }
        } else callback?.();
      }
      return Promise.reject(error);
    }
  );
}

setClientAuthInterceptorCallbak();

export default client;
