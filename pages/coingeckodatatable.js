import { useEffect, useState } from "react"
import DataTable from 'datatables.net-bs5'
import React from "react"

const PULSE = 60
const HEADERS = ['Icon', 'Symbol', 'Name', 'Price ($)', 'High ($)', 'Low ($)', 'Day Chg %']

export default function CoinGeckoDataTable() {

    const [counter, setCounter] = useState(PULSE)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(true)

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
            }
            finally {
                setLoading(false)
            }
        }

        if (counter == 0)
            setCounter(PULSE)

        if (counter == PULSE) {
            setLoading(true)
            getMarkets()

            try {
                setTimeout(() => {
                    try {
                        let table = new DataTable('#coingecko_table')
                        if (table) {
                            table.order([1, 'asc']).draw()
                        }
                    }
                    catch (e) { console.log(e) }
                }, 1000)
            } catch (e) {
                console.log(e)
            }
        }

        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
    }, [counter])

    return (
        <main>
            <div className="container my-3">
                {error && <div className="row"> <div className="alert alert-danger text-center" role="alert">{error.message}</div></div>}
                {isLoading && <div className="row"><div className="alert alert-warning text-center border border-warning fw-bold" role="alert">Loading.  Please Wait ...</div></div>}
                {!error && !isLoading && data && <>
                    <div className="row bg-success border border-success my-0 py-2 rounded-top">
                        <h3 className="text-center text-white">
                            {process.env.title} <span className="fs-6">(Refresh in {counter} seconds)</span>
                        </h3>
                    </div>
                    <div>
                        <div className="row bg-light border border-success rounded-bottom p-2">
                            <table id="coingecko_table" className="display table table-striped table-bordered table-warning nowrap">
                                <thead>
                                    <tr>
                                        {HEADERS.map((head, headID) =>
                                            <th key={headID} >{head}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((rowContent, rowID) =>
                                        rowContent && rowContent.length > 0 &&
                                        <tr key={rowID}>
                                            {rowContent.map((val, rowID) =>
                                                <td key={rowID} width={JSON.stringify(val).indexOf("https://") != -1 ? "1%" : "14%"}>
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
                                            <th key={headID} >{head}</th>)}
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