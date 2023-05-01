import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="demo for koombea technical test"
        />
        <meta
          name="keywords"
          content="TypeScript, React, NextJS, Tailwind CSS"
        />
        <meta name="author" content="Hector Lopez" />
        <meta name="robots" content="index, follow" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
