import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import Layout from "../components/templates/Layout";
import FivePotsProvider from "../core/contexts";

import "../core/styles/global.scss";
import "react-photoswipe/lib/photoswipe.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content="#3c353d" />
        <meta
          name="description"
          content="Ajude no desenvolvimento! https://git.io/5pots"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>5Pots</title>
      </Head>
      <FivePotsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FivePotsProvider>
    </>
  );
}

export default App;
