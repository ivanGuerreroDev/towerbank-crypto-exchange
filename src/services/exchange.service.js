const httpStatus = require('http-status');
const { Exchange } = require('../models');
const ApiError = require('../utils/ApiError');
const { ApiCall } = require('../utils/Api');
/**
 * getExchanges
 * @returns {Promise<Exchange>}
 */
const getExchanges = async () => {
  const exchange = await Exchange.find();
  return exchange;
};

const getPriceByAssetAllExchanges = async (coinId) => {
  const exchanges = await Exchange.find();
  const prices = [];

  for (const exchange of exchanges) {
    if(exchange["active"]){
      if(exchange.name==="Binance"){
        const {data : binanceResponse, status } = await ApiCall({
          base: exchange.api_url,
          path: '/api/v3/avgPrice',
          params: {
            symbol: coinId+'USDT'
          },
          method: 'get'
        })
        if(binanceResponse && status === 200) prices.push({
          name: exchange.name,
          price: binanceResponse.price
        })
      } else if(exchange.name==="Kraken"){

      } else if(exchange.name==="Buda"){

      } else if(exchange.name==="Bitstamp"){

      }
    }

  }
  return prices;
};



module.exports = {
  getExchanges,
  getPriceByAssetAllExchanges
};
