import Head from "next/head";
import Layout from "../components/templates/Layout";
import FivePotsProvider from "../core/contexts";

import "../core/styles/global.scss";

// eslint-disable-next-line react/prop-types
function App({ Component, pageProps }) {
  return (
    <>
      <Head>
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
