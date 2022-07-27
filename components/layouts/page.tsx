import type { NextSeoProps } from "next-seo";

import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_NAME, SITE_URL } from "@utils/constants";

export type Meta = {
  title: string | null;
  description: string | null;
  image?: string | null;
  path?: string;
  baseUrl?: string;
} & NextSeoProps;

type Props = {
  meta: Meta;
  children: React.ReactNode;
};

export default function Page({ meta, children }: Props) {
  const { locale, locales = [], defaultLocale, asPath } = useRouter();
  const { title, image, baseUrl = SITE_URL, path = asPath, description } = meta;

  const url = baseUrl + path;

  return (
    <div>
      <NextSeo
        title={title}
        description={description}
        languageAlternates={(locales || []).map((m) => ({
          hrefLang: m,
          href: m === defaultLocale ? url : `${baseUrl}/${locale}${path}`,
        }))}
        canonical={
          locale === defaultLocale ? url : `${baseUrl}/${locale}${path}`
        }
        titleTemplate={`${SITE_NAME} | %s`}
        openGraph={{
          type: "website",
          url,
          title,
          description,
          site_name: SITE_NAME,
          locale,
          images: image
            ? [
                {
                  url: image.startsWith("https://")
                    ? image
                    : `${SITE_URL}${image}`,
                  width: 800,
                  height: 600,
                  alt: "Page ",
                },
              ]
            : undefined,
        }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d41114" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {children}
    </div>
  );
}
