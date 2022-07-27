import type { PageProps } from "@types";
import type { NextPage, NextPageContext } from "next";
import type { ErrorProps } from "next/error";

import NextErrorComponent from "next/error";

type Props = PageProps &
  ErrorProps & {
    statusCode: number | null;
    hasGetInitialPropsRun: boolean;
  };

const Error: NextPage<Props> = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    //     // getInitialProps is not called in case of
    //     // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    //     // err via _app.js so it can be captured
    //     Sentry.captureException(err);
    //     // Flushing is not required in this case as it only happens on the client
  }

  return <>Somthing went wrong {statusCode}</>;
};
Error.displayName = "ErrorPage";

Error.getInitialProps = async (ctx: NextPageContext) => {
  const { err } = ctx;
  const errorInitialProps = await NextErrorComponent.getInitialProps(ctx);
  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run

  const _res: Props = {
    ...errorInitialProps,
    hasGetInitialPropsRun: true,
    // messages: { ...require(`../locales/${locale}/error.json`) },
  };

  // Running on the server, the response object (`res`) is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an exception was thrown somewhere in the React lifecycle (render,
  //    componentDidMount, etc) that was caught by Next.js's React Error
  //    Boundary. Read more about what types of exceptions are caught by Error
  //    Boundaries: https://reactjs.org/docs/error-boundaries.html

  if (err) {
    //     Sentry.captureException(err);
    //     // Flushing before returning is necessary if deploying to Vercel, see
    //     // https://vercel.com/docs/platform/limits#streaming-responses
    //     await Sentry.flush(2000);
    return _res;
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  //   Sentry.captureException(
  //     new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  //   );
  //   await Sentry.flush(2000);

  return _res;
};

export default Error;
