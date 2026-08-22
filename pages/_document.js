import { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Space Grotesk (display), Inter (body/UI), JetBrains Mono (tabular data).
            Stylesheet <link> tags belong in _document.js, not in next/head inside
            _app.js - _document only renders once for the initial HTML shell, so
            the stylesheet is never duplicated or dropped on client-side navigation. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/*
          AdSense loader script.
          - Lives in _document.js (not _app.js) with strategy="beforeInteractive"
            so Next.js injects it into the server-rendered <head> of every page's
            initial HTML. This is a hard Next.js rule: beforeInteractive is only
            valid inside _document.js - the same code in _app.js is a build error,
            and staying on afterInteractive there would mean the script only ever
            gets added client-side, which is invisible to AdSense's "connect your
            site" checker when it fetches the raw HTML.
          - onError is intentionally omitted: Next.js doesn't support onError on
            beforeInteractive scripts.
        */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1521514346848136"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
