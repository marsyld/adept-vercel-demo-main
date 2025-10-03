import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Адепт — онлайн-демо</title>
        <meta
          name="description"
          content="Адепт — цифровой помощник для косметолога и пациента: загрузка фото, визуализация До/После, история."
        />
        <meta property="og:title" content="Адепт — онлайн-демо" />
        <meta
          property="og:description"
          content="Слайдер До/После, загрузка фото, история изменений. Прототип для демонстрации."
        />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#7B61FF" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
