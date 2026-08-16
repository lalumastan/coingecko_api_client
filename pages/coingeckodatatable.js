import { useEffect, useMemo, useState } from "react"

const PULSE = 60
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]
const DEFAULT_PAGE_SIZE = 25

const COLUMNS = [
  { key: "icon", label: "Icon", sortable: false },
  { key: "symbol", label: "Symbol", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "price", label: "Price ($)", sortable: true, numeric: true },
  { key: "high", label: "High ($)", sortable: true, numeric: true },
  { key: "low", label: "Low ($)", sortable: true, numeric: true },
  { key: "changePct", label: "Day Chg %", sortable: true, numeric: true },
]

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 6,
})

const formatPrice = (value) => {
  if (value === null || value === undefined || Number.isNaN(value)) return "—"
  return priceFormatter.format(value)
}

const formatChange = (value) => {
  if (value === null || value === undefined || Number.isNaN(value)) return "—"
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}

export default function CoinGeckoDataTable() {
  const [counter, setCounter] = useState(PULSE)
  const [coins, setCoins] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState("symbol")
  const [sortDir, setSortDir] = useState("asc")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  const getMarkets = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/coingecko")
      const result = await response.json()
      const rows = Object.keys(result).map((i) => ({
        id: result[i].id ?? result[i].symbol + i,
        icon: result[i].image,
        symbol: (result[i].symbol || "").toUpperCase(),
        name: result[i].name,
        price: result[i].current_price,
        high: result[i].high_24h,
        low: result[i].low_24h,
        changePct: result[i].price_change_percentage_24h,
      }))
      setCoins(rows)
      setError(null)
    } catch (e) {
      console.log(e)
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  // Auto-refresh loop: fetch once immediately, then again every PULSE seconds.
  useEffect(() => {
    getMarkets()
    const tick = setInterval(() => {
      setCounter((c) => {
        if (c <= 1) {
          getMarkets()
          return PULSE
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(tick)
  }, [])

  const handleManualRefresh = () => {
    setCounter(PULSE)
    getMarkets()
  }

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
    setPage(1)
  }

  const filteredSorted = useMemo(() => {
    if (!coins) return []
    const term = search.trim().toLowerCase()
    const filtered = term
      ? coins.filter((c) => c.symbol.toLowerCase().includes(term) || (c.name || "").toLowerCase().includes(term))
      : coins

    const sorted = [...filtered].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (typeof av === "string" || typeof bv === "string") {
        return String(av ?? "").localeCompare(String(bv ?? ""))
      }
      return (av ?? 0) - (bv ?? 0)
    })

    if (sortDir === "desc") sorted.reverse()
    return sorted
  }, [coins, search, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const pageRows = filteredSorted.slice((safePage - 1) * pageSize, safePage * pageSize)

  const ringRadius = 14
  const ringCircumference = 2 * Math.PI * ringRadius
  const ringOffset = ringCircumference * (1 - counter / PULSE)

  return (
    <main>
      <div className="container my-3">
        {error && (
          <div className="market-panel">
            <div className="state-panel">
              <div className="state-icon error" aria-hidden="true">!</div>
              <h4>Couldn&apos;t load market data</h4>
              <p>{error.message || "The request to CoinGecko failed. This clears itself automatically on the next refresh."}</p>
              <button className="refresh-btn" style={{ marginTop: 16 }} onClick={handleManualRefresh}>
                Try again
              </button>
            </div>
          </div>
        )}

        {!error && !coins && isLoading && (
          <div className="market-panel">
            <div className="state-panel">
              <div className="state-icon loading" aria-hidden="true">
                <span className="skeleton-bar" style={{ width: 18, height: 18, borderRadius: "50%" }} />
              </div>
              <h4>Loading live market data</h4>
              <p>Pulling the latest prices from CoinGecko&hellip;</p>
            </div>
          </div>
        )}

        {!error && coins && (
          <div className="market-panel">
            <div className="market-panel-header">
              <div>
                <h1 className="market-title">{process.env.title}</h1>
                <p className="market-subtitle">{filteredSorted.length} coins tracked &middot; updated from CoinGecko</p>
              </div>

              <div className="live-status">
                <div className={`countdown-ring${isLoading ? " spinning" : ""}`} role="img" aria-label={isLoading ? "Refreshing now" : `Refreshing in ${counter} seconds`}>
                  <svg width="34" height="34" viewBox="0 0 34 34">
                    <circle className="track" cx="17" cy="17" r={ringRadius} fill="none" strokeWidth="3" />
                    <circle
                      className="progress"
                      cx="17"
                      cy="17"
                      r={ringRadius}
                      fill="none"
                      strokeWidth="3"
                      strokeDasharray={ringCircumference}
                      strokeDashoffset={isLoading ? 0 : ringOffset}
                    />
                  </svg>
                </div>
                <div className="live-status-text">
                  <strong>{isLoading ? "Refreshing" : "Live"}</strong><br />
                  {isLoading ? "fetching latest prices" : `next update in ${counter}s`}
                </div>
                <button className="refresh-btn" onClick={handleManualRefresh} disabled={isLoading}>
                  Refresh now
                </button>
              </div>
            </div>

            <div className="market-toolbar">
              <div className="search-field">
                <span className="icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                  placeholder="Search by symbol or name"
                  aria-label="Search coins"
                />
              </div>

              <div className="page-size-select">
                <label htmlFor="page-size">Rows per page</label>
                <select
                  id="page-size"
                  value={pageSize}
                  onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}
                >
                  {PAGE_SIZE_OPTIONS.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="table-scroll">
              <table className="market-table">
                <thead>
                  <tr>
                    {COLUMNS.map((col) => (
                      <th key={col.key} className={col.key === "icon" ? "col-icon" : undefined}>
                        {col.sortable ? (
                          <button type="button" onClick={() => handleSort(col.key)}>
                            {col.label}
                            <span className={`sort-caret${sortKey === col.key ? " active" : ""}`}>
                              {sortKey === col.key ? (sortDir === "asc" ? "▲" : "▼") : "▲"}
                            </span>
                          </button>
                        ) : (
                          col.label
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.length === 0 && (
                    <tr>
                      <td colSpan={COLUMNS.length} style={{ textAlign: "center", padding: "32px 16px", color: "var(--text-muted)" }}>
                        No coins match &ldquo;{search}&rdquo;.
                      </td>
                    </tr>
                  )}
                  {pageRows.map((coin) => (
                    <tr key={coin.id}>
                      <td className="col-icon">
                        <img src={coin.icon} alt="" className="coin-icon" loading="lazy" />
                      </td>
                      <td className="coin-symbol">{coin.symbol}</td>
                      <td className="coin-name">{coin.name}</td>
                      <td className="num">{formatPrice(coin.price)}</td>
                      <td className="num">{formatPrice(coin.high)}</td>
                      <td className="num">{formatPrice(coin.low)}</td>
                      <td>
                        <span className={`change-pill ${coin.changePct > 0 ? "gain" : coin.changePct < 0 ? "loss" : "flat"}`}>
                          {coin.changePct > 0 ? "▲" : coin.changePct < 0 ? "▼" : ""} {formatChange(coin.changePct)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination-bar">
              <div className="pagination-summary">
                Showing {filteredSorted.length === 0 ? 0 : (safePage - 1) * pageSize + 1}
                &ndash;{Math.min(safePage * pageSize, filteredSorted.length)} of {filteredSorted.length}
              </div>
              <div className="pagination-controls">
                <button className="page-btn" onClick={() => setPage(1)} disabled={safePage === 1}>«</button>
                <button className="page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1}>‹</button>
                <span className="page-btn active" style={{ cursor: "default" }}>{safePage}</span>
                <span className="pagination-summary">of {totalPages}</span>
                <button className="page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages}>›</button>
                <button className="page-btn" onClick={() => setPage(totalPages)} disabled={safePage === totalPages}>»</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
