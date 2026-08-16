import "../styles/globals.css"

import Head from "next/head"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head className="site-navbar" role="banner">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes" />
        <title>{process.env.title}</title>
      </Head>

      {/* AdSense: use next/script with strategy="afterInteractive" to avoid data-nscript warning */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1521514346848136"
        crossOrigin="anonymous"
      />

      <Component {...pageProps} />
    </>
  )
}
