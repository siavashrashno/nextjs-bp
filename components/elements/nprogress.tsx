/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Progress() {
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const routerChangeStart = () => {
      timeout = setTimeout(NProgress.start, 100);
      NProgress.set(0.3);
      NProgress.start();
    };

    const routerChangeEnd = () => {
      clearTimeout(timeout);
      NProgress.done(true);
    };
    const routerChangeError = () => {
      clearTimeout(timeout);
      NProgress.done(true);
    };
    router.events.on("routeChangeStart", routerChangeStart);
    router.events.on("routeChangeComplete", routerChangeEnd);
    router.events.on("routeChangeError", routerChangeError);

    return () => {
      router.events.off("routeChangeStart", routerChangeStart);
      router.events.off("routeChangeComplete", routerChangeEnd);
      router.events.off("routeChangeError", routerChangeError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
