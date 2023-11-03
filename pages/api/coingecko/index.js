import { promises as fs } from 'fs'
import os from 'os'
import path from 'path'

const marketJsonFIle = os.tmpdir() + path.sep + 'markets.json'

export default async function handler(req, res) {
  
  let result = null  
  const PING = "ping"
  const MARKETS = "coins/markets?vs_currency=usd&per_page=250&page=1"    

  let response = await callCoinGeckoApi(PING)

  if (response.status !== 200) {
    let error = await response.json()
    console.log('CoinGecko ping error:', error)

    console.log("Loading from cache because unable to ping the server ...")
    res.statusCode = 200
    result = await getMarkets()
  }
  else {
    response = await callCoinGeckoApi(MARKETS)

    if (response.status == 429) {
      console.log("Loading from cache because of too many request error ...")
      res.statusCode = 200
      result = await getMarkets()
    }
    else if (response.status == 200) {
      console.log("Loading from CoinGecko and saving to cache ...")
      result = JSON.stringify(await response.json())

      fs.writeFile(marketJsonFIle, result, (err) => {
        if (err) console.log('Error writing file:', err)
      })
    }
    else {
      let error = await response.json()
      res.status(response.status).json({ message: error.detail })
      return
    }
  }

  res.status(response.status).send(result)
}

export const config = {
  api: {
    responseLimit: '10mb',
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

async function callCoinGeckoApi(endpoint) {
  const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/"
  const HEADERS = {
    "Content-Type": "application/json"
  }

  return await fetch(COINGECKO_API_URL + endpoint, {
    method: "GET",
    headers: HEADERS
  })
}

async function getMarkets() {
  const file = await fs.readFile(marketJsonFIle)

  return file
}