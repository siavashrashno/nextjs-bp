// import { GTM_ID } from "@utils/gtag";
import { GTM_ID } from "@utils/gtag";
import Document, { Html, Main, NextScript, Head } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html dir="rtl" lang={this.props.locale}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body className="loading">
          {GTM_ID ? (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          ) : null}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
