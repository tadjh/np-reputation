import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Mouse+Memoirs&family=Trade+Winds&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-slate-900 [&>div]:flex [&>div]:min-h-screen [&>div]:flex-col [&>div]:justify-center">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
