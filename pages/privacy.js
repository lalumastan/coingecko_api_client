import Head from "next/head"
import Link from "next/link"

export default function Privacy() {
  return (
    <div className="page-shell">
      <Head>
        <title>Privacy Policy | iCS Discover</title>
        <meta
          name="description"
          content="Privacy policy for iCS Discover's Crypto Market Watch, including how third-party advertising cookies are used."
        />
      </Head>

      <div className="container doc-page">
        <Link className="back-link" href="/">&larr; Back to the dashboard</Link>
        <h1>Privacy Policy</h1>
        <p className="doc-updated">Last updated: August 2026</p>

        <h2>Overview</h2>
        <p>
          This page explains what data this site collects and how it is
          used. iCS Discover&apos;s Crypto Market Watch does not require an
          account, does not collect payment information, and does not sell
          personal data.
        </p>

        <h2>Data this site does not collect</h2>
        <p>
          The dashboard itself does not ask for or store names, emails,
          passwords, or any personal profile information. Market data
          requests to the CoinGecko API are made anonymously on your
          behalf and are not linked to your identity by this site.
        </p>

        <h2>Cookies and advertising</h2>
        <p>
          This site uses Google AdSense to display ads. Google and its
          advertising partners may use cookies, web beacons, and similar
          technologies to serve ads based on your prior visits to this or
          other websites.
        </p>
        <ul>
          <li>
            You can opt out of personalized advertising by visiting{" "}
            <a href="https://adssettings.google.com" target="_new" rel="noopener noreferrer">
              Google&apos;s Ads Settings
            </a>
            .
          </li>
          <li>
            For users in regions where it applies, you can also review
            options at{" "}
            <a href="https://www.aboutads.info/choices" target="_new" rel="noopener noreferrer">
              www.aboutads.info/choices
            </a>
            .
          </li>
          <li>
            Third-party vendors, including Google, use cookies to serve ads
            based on someone&apos;s prior visits to this site or other
            sites on the internet.
          </li>
        </ul>

        <h2>Third-party links</h2>
        <p>
          This site links out to third-party services (such as CoinGecko,
          GitHub, LinkedIn, and YouTube). Those sites have their own
          privacy policies, and this policy does not apply to them.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          This policy may be updated from time to time. Continued use of
          the site after a change constitutes acceptance of the updated
          policy.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href="mailto:lalumastan@gmail.com">lalumastan@gmail.com</a>.
        </p>
      </div>
    </div>
  )
}
