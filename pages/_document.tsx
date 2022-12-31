import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
      <Html>
        <Head>
            <meta name="description" content="" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link crossOrigin="anonymous" rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Unbounded:wght@300;400;500&display=swap" rel="stylesheet"/> 
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
  