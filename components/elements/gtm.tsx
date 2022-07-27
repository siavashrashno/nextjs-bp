import type { NextRouter } from "next/router";

import { useEffect } from "react";
import { GA_TRACKING_ID, GTM_ID, pageview } from "@utils/gtag";
import Script from "next/script";

export default function GTM({ router }: { router: NextRouter }) {
  // useEffect(() => {
  //   // `routeChangeComplete` won't run for the first page load unless the query string is
  //   // hydrated later on, so here we log a page view if this is the first render and
  //   // there's no query string
  //   if (!router.asPath.includes("?")) {
  //     pageview(router.asPath);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);

    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  /* Google Tag Manager - Global base code */
  return (
    <>
      {GTM_ID ? (
        <Script
          strategy="afterInteractive"
          id="google-tag-manager-script"
          dangerouslySetInnerHTML={{
            __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer', '${GTM_ID}');
`,
          }}
        />
      ) : null}
      {GA_TRACKING_ID ? (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            strategy="afterInteractive"
            id="google-analytics-script"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </>
      ) : null}
    </>
  );
}
