import { promises as fs } from 'fs';

export default async function handler(req, res) {

  let result = null;
  const PING = "ping";
  const MARKETS = "coins/markets?vs_currency=usd&per_page=250&page=1";

  let response = await callCoinGeckoApi(PING);

  if (response.status !== 200) {
    let error = await response.json();
    console.log('CoinGecko ping error:', error);

    console.log("Loading from cache because unable to ping the server ...");
    res.statusCode = 200;
    result = await getMarkets();
  }
  else {
    response = await callCoinGeckoApi(MARKETS);

    if (response.status == 429) {
      console.log("Loading from cache because of too many request error ...");
      res.statusCode = 200;
      result = await getMarkets();
    }
    else if (response.status == 200) {
      console.log("Loading from CoinGecko ...");
      result = JSON.stringify(await response.json());
    }
    else {
      let error = await response.json();
      res.statusCode = response.status;
      res.end(JSON.stringify({ detail: error.detail }));
      return;
    }
  }

  res.statusCode = response.status;
  res.end(result);
};

export const config = {
  api: {
    responseLimit: '10mb',
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

async function callCoinGeckoApi(endpoint) {
  const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/";
  const HEADERS = {
    "Content-Type": "application/json"
  };

  return await fetch(COINGECKO_API_URL + endpoint, {
    method: "GET",
    headers: HEADERS
  });
};

async function getMarkets() {
  const file = await fs.readFile('markets.json');

  return file;
}