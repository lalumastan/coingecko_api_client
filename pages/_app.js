import 'bootstrap/dist/css/bootstrap.min.css'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import "../styles/globals.css"

import { useEffect } from "react"
import Head from "next/head"

export default function App({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])

  return <>
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
}