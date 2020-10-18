import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#3c353d" />
          <meta
            name="description"
            content="Ajude no desenvolvimento! https://git.io/5pots"
          />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link
            href="https://fonts.googleapis.com/css?family=Josefin+Sans:300,400,600,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
