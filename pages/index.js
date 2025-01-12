import CoinGeckoDataTable from "./coingeckodatatable"

export default function Home() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark justify-content-between sticky-top fs-4" role="navigation">
          <div className="container-fluid">
            <a className="navbar-brand mx-2" href="#"><img src="/favicon.ico" alt="ICS Discover Logo" width="30%" className="border border-primary rounded" /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto text-nowrap">
                <li className="nav-item">
                  <a className="nav-link" href="https://www.youtube.com/channel/UCLZnGghxjldvhQSnno47Olw" target="_new">Tutorials</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://github.com/lalumastan" target="_new">Github</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://www.linkedin.com/in/mohammed-islam-57264235" target="_new">Linkedin</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="mailto:lalumastan@gmail.com">Contact</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://www.youtube.com/@icsdiscover/about" target="_new">About</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <CoinGeckoDataTable />
      <footer>
        <div className="container text-white fw-bold">
          <p align="center">
            &copy; 2023 by ICS Discover
          </p>
        </div>
      </footer>
    </>
  )
}
