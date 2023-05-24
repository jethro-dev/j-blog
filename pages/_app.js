import { useState, useEffect } from "react";
import "../styles/globals.scss";
import { Layout } from "../components";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      {router.pathname == "/signin" ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
}

export default MyApp;
