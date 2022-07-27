import type { NextComponentType, NextPageContext } from "next";
import type { LayoutInternalProps, LayoutProps, PageProps } from "@types";

import React, { FC } from "react";
import dynamic from "next/dynamic";
import Header from "@modules/layout/header";
import Footer from "@modules/layout/footer";
import cn from "classnames";

const NProgress = dynamic(() => import("@elements/nprogress"), { ssr: false });
const ModalUI = dynamic(() => import("./modal-ui"), { ssr: false });

const Layout: FC<LayoutInternalProps> = ({
  children,
  mainClassName,
  rootClassName,
  mainContainerClassName,
  contentContainerClassName,
}) => {
  return (
    <div className={cn("min-h-screen flex flex-col bg-white", rootClassName)}>
      <Header />
      <div
        className={cn(
          "flex flex-col w-full flex-1 mt-header-md md:mt-header",
          mainContainerClassName
        )}
      >
        <main className={cn("flex flex-1", mainClassName)}>
          <div
            className={cn(
              "flex flex-col w-full relative ",
              contentContainerClassName
            )}
          >
            {children}
          </div>
        </main>
        <Footer />
      </div>
      <ModalUI />
      {/* <SidebarUI /> */}
      {/* <CookieBanner
        title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
        hide={acceptedCookies}
        onAccept={() => onAcceptCookies()}
      /> */}
      <NProgress />
    </div>
  );
};

export default Layout;

export const getLayout = (
  Page: NextComponentType<NextPageContext, any, PageProps>,
  pageProps: PageProps,
  props?: LayoutProps
) => (
  <Layout {...props} pageProps={pageProps}>
    <Page {...pageProps} />
  </Layout>
);

export const noLayout = (
  Page: NextComponentType<NextPageContext, any, PageProps>,
  pageProps: PageProps
) => <Page {...pageProps} />;
