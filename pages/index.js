import { useState } from "react"
import CoinGeckoDataTable from "./coingeckodatatable"
import AdUnit from "../components/AdUnit"

const NAV_LINKS = [
  { href: "https://www.youtube.com/channel/UCLZnGghxjldvhQSnno47Olw", label: "Tutorials" },
  { href: "https://github.com/lalumastan", label: "Github" },
  { href: "https://www.linkedin.com/in/mohammed-islam-57264235", label: "Linkedin" },
  { href: "mailto:lalumastan@gmail.com", label: "Contact" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
]

export default function Home() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="page-shell">
      <header>
        <nav className="topbar" role="navigation" aria-label="Primary">
          <div className="container topbar-inner">
            <a className="brand" href="#">
              <img src="/favicon.ico" alt="ICS Discover logo" />
              <span className="brand-mark-dot" aria-hidden="true" />
              iCS Discover
            </a>
            <button
              className="nav-toggle"
              type="button"
              aria-expanded={navOpen}
              aria-controls="primary-nav-links"
              aria-label="Toggle navigation menu"
              onClick={() => setNavOpen((open) => !open)}
            >
              <span />
            </button>
            <div className={`nav-links${navOpen ? " open" : ""}`} id="primary-nav-links">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_new" : undefined}
                  onClick={() => setNavOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <div className="container">
        <AdUnit slot="9453353142" format="auto" fullWidthResponsive />
      </div>

      <CoinGeckoDataTable />

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>&copy; 2026 by ICS Discover</span>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </footer>
    </div>
  )
}
