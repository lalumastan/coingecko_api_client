import "../styles/globals.css"

import Head from "next/head"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head className="site-navbar" role="banner">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes" />
        <title>{process.env.title}</title>
      </Head>

      {/* AdSense loader script now lives in _document.js - see the comment
          there for why beforeInteractive can't be used from here. */}
      <Component {...pageProps} />
    </>
  )
}
