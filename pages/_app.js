import "../styles/globals.css"

import Head from "next/head"
import Script from "next/script"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head className="site-navbar" role="banner">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes" />
        <title>{process.env.title}</title>
      </Head>

      {/*
        AdSense loader script, shared across every page.
        - next/script (not a raw <script> tag) so Next dedupes/manages it and
          it doesn't clash with hydration.
        - strategy="afterInteractive" loads it once the page is interactive,
          so it never competes with or blocks the initial render of the
          market data table.
        - onError just logs; a failed/blocked ad script must never crash
          the app, it only means ad slots stay empty.
      */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1521514346848136"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onError={(err) => console.warn("AdSense script failed to load", err)}
      />

      <Component {...pageProps} />
    </>
  )
}
