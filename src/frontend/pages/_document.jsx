import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <title>MuuCMS with Next</title>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
