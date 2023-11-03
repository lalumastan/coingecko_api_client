import useSWR from 'swr'
import { useEffect, useState } from "react"
import DataTable from 'datatables.net-bs5'
import type { MarketArray, ResponseError } from './interfaces'
import React from "react"
import Image from 'next/image'

const PULSE = 60
const HEADERS = ['Icon', 'Symbol', 'Name', 'Price ($)', 'High ($)', 'Low ($)', 'Day Chg %']


const fetcher = async (url: string) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200 && res.status !== 429) {
        throw new Error(data.message)
    }
    return data
}

export default function CoinGeckoDataTable() {

    const [counter, setCounter] = useState(PULSE)
    const { data, error, isLoading } = useSWR<
        MarketArray,
        ResponseError
    >(() => (`/api/coingecko`), fetcher)

    useEffect(() => {
        if (data) {
            if (counter == 0)
                setCounter(PULSE)

            if (counter == PULSE) {
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
        }
    }, [counter])

    return (
        <main>
            <div className="container my-3">
                {error && <div className="row"> <div className="alert alert-danger" role="alert">{error.message}</div></div>}
                {(isLoading) && <div className="row"><div className="alert alert-warning text-center border border-warning fw-bold" role="alert">Loading.  Please Wait ...</div></div>}
                {!isLoading && data && <>
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
                                        rowContent &&
                                        <tr key={rowID}>
                                            <td><Image src={rowContent.image} width={30} height={30} alt={rowContent.name} /></td>
                                            <td>{rowContent.symbol}</td>
                                            <td>{rowContent.name}</td>
                                            <td>{rowContent.current_price}</td>
                                            <td>{rowContent.high_24h}</td>
                                            <td>{rowContent.low_24h}</td>
                                            <td>{rowContent.price_change_percentage_24h}</td>
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