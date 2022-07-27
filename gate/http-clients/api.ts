import axios from "axios";
import { getCookie, getLocale } from "@utils/Cookies";
import { COOKIE_LOCALE_KEY } from "@utils/constants";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  responseType: "json",
});
client.defaults.timeout = 10000;

client.interceptors.request.use(
  async function (config) {
    const Cookies = getCookie();
    if (!config.headers) config.headers = {};
    if (!config.headers["Accept-Language"])
      config.headers["Accept-Language"] =
        getLocale() || Cookies.get(COOKIE_LOCALE_KEY);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default client;
