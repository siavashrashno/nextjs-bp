import type {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  NextPageContext,
} from "next";
import type { AppContext } from "next/app";

import Cookie from "./Cookie";

type CookieContext = NextPageContext | GetServerSidePropsContext | undefined;
let ctx: CookieContext;
let staticCtx: GetStaticPropsContext | null = null;

let cookie: Cookie | undefined;

export const getCookie = () => {
  return cookie || new Cookie();
};
export const getCookieFromContext = (
  ctxOrCookie?: GetServerSidePropsContext
) => {
  return new Cookie(ctxOrCookie);
};

export const setAppContext = (ctxOrCookie: AppContext) => {
  ctx = ctxOrCookie.ctx;
  staticCtx = null;
  cookie = new Cookie(ctx);
};
export const setContext = (ctxOrCookie: CookieContext) => {
  ctx = ctxOrCookie;
  staticCtx = null;
  cookie = new Cookie(ctx);
};
export const setStaticContext = (ctxOrCookie: GetStaticPropsContext) => {
  staticCtx = ctxOrCookie;
  cookie = new Cookie();
};
export const getLocale = () => ctx?.locale || staticCtx?.locale || "";
