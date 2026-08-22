import Head from "next/head"
import Link from "next/link"

export default function About() {
  return (
    <div className="page-shell">
      <Head>
        <title>About | iCS Discover</title>
        <meta
          name="description"
          content="About iCS Discover's Crypto Market Watch, a live cryptocurrency price and market-data dashboard built on the CoinGecko API."
        />
      </Head>

      <div className="container doc-page">
        <Link className="back-link" href="/">&larr; Back to the dashboard</Link>
        <h1>About iCS Discover</h1>

        <p>
          iCS Discover&apos;s Crypto Market Watch is a live cryptocurrency
          market dashboard. It pulls current pricing, market capitalization,
          and trading volume for a broad range of coins directly from the
          public CoinGecko API and presents it as a sortable, filterable
          table so you can scan the market at a glance.
        </p>

        <h2>What this site does</h2>
        <p>
          The dashboard refreshes market data on demand and lets you sort by
          price, 24-hour change, market cap, and volume, so you can quickly
          spot movers without digging through a dozen separate exchange
          pages.
        </p>

        <h2>Data source</h2>
        <p>
          All market data is sourced from{" "}
          <a href="https://www.coingecko.com" target="_new" rel="noopener noreferrer">
            CoinGecko
          </a>
          . iCS Discover is an independent project and is not affiliated
          with or endorsed by CoinGecko.
        </p>

        <h2>Not financial advice</h2>
        <p>
          Nothing on this site is investment, financial, or trading advice.
          Cryptocurrency prices are volatile; always do your own research
          before making financial decisions.
        </p>

        <h2>Contact</h2>
        <p>
          Questions or feedback are welcome at{" "}
          <a href="mailto:lalumastan@gmail.com">lalumastan@gmail.com</a>.
        </p>
      </div>
    </div>
  )
}
