import type { AppProps, NextWebVitalsMetric } from "next/app";
import type { PageProps, PageWithLayout } from "@types";

import React, { useEffect } from "react";
import { SWRConfig } from "swr";
import {
  getLayout as getDefaultLayout,
  noLayout,
} from "@layouts/default-layout";
import ResizeHandler from "@elements/resize-handler";
import LocaleHandler from "@elements/locale-handler";
import GTM from "@elements/gtm";
import { fetcher, serialize } from "@utils/swr";
import { event } from "@utils/gtag";

import "../styles/index.css";

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) {
  event({
    action: name,
    category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    label: id, // id unique to current page load
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    non_interaction: true,
  });
}

function MyApp(props: AppProps<PageProps> & { err: any }) {
  const {
    Component,
    router,
    err,
    pageProps: { user, messages, now, ...restProps },
  } = props;

  const fallback = props.pageProps.fallback || {};

  useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);

  const { getLayout = getDefaultLayout } =
    Component as PageWithLayout<PageProps>;

  return (
    <SWRConfig value={{ fetcher, use: [serialize], fallback }}>
      <ResizeHandler />
      <LocaleHandler router={router} />
      <GTM router={router} />
      {(getLayout || noLayout)(Component, { ...restProps, err })}
    </SWRConfig>
  );
}
export default MyApp;
