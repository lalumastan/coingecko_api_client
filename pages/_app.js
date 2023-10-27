import 'bootstrap/dist/css/bootstrap.min.css';

import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

import "../styles/globals.css";

import { useEffect } from "react";

export default function App({ Component, pageProps }) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    require("datatables.net-bs5/js/dataTables.bootstrap5.min.js");
  }, []);

  return <Component {...pageProps} />;
}