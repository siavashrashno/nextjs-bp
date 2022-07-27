import type { NextComponentType, NextPage, NextPageContext } from "next";
import { ReactNode } from "react";

type PageError =
  | (Error & {
      statusCode?: number;
    })
  | null;

export type MenuItemType = {
  title: string;
  href: string;
  id: number;
  multilevel: boolean;
  fromServer?: boolean;
};

export interface PageProps {
  originalUrl?: string;
  // messages?: IntlMessages;
  now?: Date | undefined;
  fallback?: {
    [key: string]: any;
  };
  err?: PageError;
}

export interface LayoutProps {
  rootClassName?: string;
  mainClassName?: string;
  mainContainerClassName?: string;
  contentContainerClassName?: string;
  children?: ReactNode;
}

export type LayoutInternalProps = LayoutProps & { pageProps: PageProps };

export type PageComponent<P = Record<string, never>> = NextPage<P> & {
  translationFile?: string;
};
export type PageWithLayout<P = Record<string, never>> = PageComponent<P> & {
  getLayout:
    | ((
        page: NextComponentType<NextPageContext, any, PageProps>,
        pageProps: PageProps,
        props?: LayoutProps
      ) => React.ReactNode)
    | null;
};
