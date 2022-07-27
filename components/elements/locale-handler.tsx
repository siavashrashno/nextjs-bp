import type { NextRouter } from "next/router";

import { getCookie } from "@utils/Cookies";
import { useEffect } from "react";
import { COOKIE_LOCALE_KEY, NEXT_LOCALE_KEY } from "@utils/constants";

export default function LocaleHandler({ router }: { router: NextRouter }) {
  const { locale } = router;
  useEffect(() => {
    const Cookie = getCookie();
    Cookie.set(COOKIE_LOCALE_KEY, locale);
    if (!Cookie.get(NEXT_LOCALE_KEY)) Cookie.set(NEXT_LOCALE_KEY, locale);
  }, [locale]);
  return <></>;
}
