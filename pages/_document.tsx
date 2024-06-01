import Document, { Html, Head, Main, NextScript } from 'next/document';
// meta scripts
// import MetaScripts from '@components/MetaScripts';

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <MetaScripts /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
