import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Favicons */}
        <link
          rel='apple-touch-icon'
          href='../apple-touch-icon.png'
          sizes='180x180'
        />
        <link
          rel='icon'
          href='../favicon-16x16.png'
          type='image/png'
          sizes='16x16'
        />
        <link
          rel='icon'
          href='../favicon-32x32.png'
          type='image/png'
          sizes='32x32'
        />
        <meta
          name='msapplication-TileColor'
          content='#fffbf6'
        />
        <meta
          name='theme-color'
          content='#fffbf6'
        />
        <link
          rel='canonical'
          href='https://www.thetravelenablers.com'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
