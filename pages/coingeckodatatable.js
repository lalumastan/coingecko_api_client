import { useEffect, useState, useRef } from "react"

const PULSE = 60
const HEADERS = ['Icon', 'Symbol', 'Name', 'Price ($)', 'High ($)', 'Low ($)', 'Day Chg %']

export default function CoinGeckoDataTable() {

    const [counter, setCounter] = useState(PULSE)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const tableRef = useRef(null)  // ref to track the DataTable instance

    useEffect(() => {
        const getMarkets = async () => {
            try {
                const response = await fetch("/api/coingecko")
                const result = await response.json()
                let data = [[]]
                Object.keys(result).forEach(function (i) {
                    data.push([result[i].image, result[i].symbol, result[i].name, result[i].current_price, result[i].high_24h, result[i].low_24h, result[i].price_change_percentage_24h])
                })
                setData(data)
            } catch (e) {
                console.log(e)
                setError(e)
            } finally {
                setLoading(false)
            }
        }

        if (counter == 0)
            setCounter(PULSE)

        if (counter == PULSE) {
            setLoading(true)
            getMarkets()
        }

        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
    }, [counter])

    // Initialize or refresh DataTable whenever `data` changes
    useEffect(() => {
        if (!data) return

        const initDataTable = async () => {
            // Import jQuery and make it available on window so DataTables can find it
            const $ = (await import('jquery')).default
            window.$ = $
            window.jQuery = $

            // Import DataTables — this attaches itself to the jQuery on window
            await import('datatables.net-bs5')

            // Destroy existing instance before re-initializing (prevents "already initialized" error)
            if (tableRef.current) {
                tableRef.current.destroy()
                tableRef.current = null
            }

            // Now window.$ has DataTables attached, so $.fn.DataTable is available
            tableRef.current = window.$('#coingecko_table').DataTable({
                order: [[1, 'asc']],
                responsive: true,
            })
        }

        initDataTable()
    }, [data])

    return (
        <main>
            <div className="container my-3">
                {error && <div className="row"> <div className="alert alert-danger text-center" role="alert">{error.message}</div></div>}
                {!error && !data && isLoading && <div className="row"><div className="alert alert-warning text-center border border-warning fw-bold" role="alert">Loading.  Please Wait ...</div></div>}
                {!error && data && <>
                    <div className="row bg-success border border-success my-0 py-2 rounded-top">
                        <h3 className="text-center text-white">
                            {process.env.title} <span className="fs-6">({isLoading ? <span>Refreshing now ...</span> : <span>Refreshing in {counter} seconds</span>})</span>
                        </h3>
                    </div>
                    <div>
                        <div className="row bg-light border border-success rounded-bottom p-2">
                            <table id="coingecko_table" className="display table table-striped table-bordered table-warning nowrap">
                                <thead>
                                    <tr>
                                        {HEADERS.map((head, headID) =>
                                            <th key={headID}>{head}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((rowContent, rowID) =>
                                        rowContent && rowContent.length > 0 &&
                                        <tr key={rowID}>
                                            {rowContent.map((val, colID) =>
                                                <td key={colID} width={JSON.stringify(val).indexOf("https://") != -1 ? "1%" : "14%"}>
                                                    {JSON.stringify(val).indexOf("https://") != -1 && <img src={val} align="center" className="center" />}
                                                    {JSON.stringify(val).indexOf("https://") == -1 && val}
                                                </td>
                                            )}
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        {HEADERS.map((head, headID) =>
                                            <th key={headID}>{head}</th>)}
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div></>
                }
            </div>
        </main>
    )
}