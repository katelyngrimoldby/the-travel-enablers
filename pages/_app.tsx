import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Script from "next/script";
import Layout from "../components/Layout";
import CookieBanner from "../components/CookieBanner";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const [result, setResult] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.localStorage.getItem("result")) {
      setResult(window.localStorage.getItem("result") === "true");
    }
    if (result != null) {
      window.localStorage.setItem("result", result.toString());
    }

    setLoading(false);
  }, [result]);

  return (
    <>
      {result == true && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
          />
          <Script id="analytics" strategy="lazyOnload">
            {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.NEXT_PUBLIC_GA}');`}
          </Script>
        </>
      )}
      <Layout>
        {result == null && loading == false && (
          <CookieBanner
            accept={() => {
              setResult(true);
            }}
            reject={() => {
              setResult(false);
            }}
          />
        )}

        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
