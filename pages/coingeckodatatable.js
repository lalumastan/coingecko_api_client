import { useEffect, useState } from "react";
import DataTable from 'datatables.net-bs5';

const PULSE = 60;
const HEADERS = ['Icon', 'Symbol', 'Name', 'Price ($)', 'High ($)', 'Low ($)', 'Day Chg %'];

export default function CoinGeckoDataTable(pageProps) {

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [title, setTitle] = useState(pageProps.title);
    const [counter, setCounter] = useState(PULSE);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/coingecko", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const result = await response.json();
                let data = [[]];
                Object.keys(result).forEach(function (i) {
                    data.push([result[i].image, result[i].symbol, result[i].name, result[i].current_price, result[i].high_24h, result[i].low_24h, result[i].price_change_percentage_24h]);
                });

                setData(data);
            } catch (e) {
                console.log(e);
                setError(e);
            }
            finally {
                setLoading(false);
            }
        };

        if (counter == 0)
            setCounter(PULSE);

        if (counter == PULSE) {
            setLoading(true);
            fetchData();

            try {
                setTimeout(() => {
                    try {
                        let table = new DataTable('#coingecko_table');
                        if (table) {
                            table.order([1, 'asc']).draw();
                        }
                    }
                    catch (e) { console.log(e); }
                }, 1000);
            } catch (e) {
                console.log(e);
            }
        }

        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (
        <div className="container my-3">
            <div className="row">
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
            </div>
            <div className="row">
                {isLoading && <div className="alert alert-warning text-center border border-warning fw-bold" role="alert">Loading.  Please Wait ...</div>}
            </div>
            <div className="row bg-success border border-success my-0 py-2 rounded-top">
                <h3 className="text-center text-white">
                    {title} <span className="fs-6">(Refresh in {counter} seconds)</span>
                </h3>
            </div>
            <div>
                {!isLoading && data && data.length > 0 &&
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
                }
            </div>
        </div>
    );
}