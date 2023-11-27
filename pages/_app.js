import { GoogleAdSense } from "nextjs-google-adsense";

import 'bootstrap/dist/css/bootstrap.min.css'

import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'

import "../styles/globals.css"

import { useEffect } from "react"

import Head from "next/head"

export default function App({ Component, pageProps }) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
    require("datatables.net-bs5/js/dataTables.bootstrap5.min.js")
  }, [])

  return <>
          <Head className="site-navbar" role="banner">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes" />
            <title>{process.env.title}</title>
          </Head>
          <GoogleAdSense publisherId="ca-pub-1521514346848136" />
          <Component {...pageProps} />
        </>
}