const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        port: '',
        pathname: '/coins/images/**',
      },
    ],
  }, 
  env: {
    title: "iCS Discover's Crypto Market Watch using CoinGecko API",
  },
};

module.exports = nextConfig;