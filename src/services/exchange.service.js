const httpStatus = require('http-status');
const { Exchange, SwapRequest } = require('../models');
const ApiError = require('../utils/ApiError');
const { ApiCall } = require('../utils/Api');
const { Spot } = require('@binance/connector')
const {SignatureAndTimestampBinance} = require('../utils/SignatureBinance')

const apiKey = 'rNVAoZjKQorYjpnHQFRHn1Q30hdu5dAnRmLvuWl2VE1ml5BpYSrzEs0Lylpa9EN5'
const apiSecret = 'YB33MhssrFmbAsEmcuWOoDQWT6F2upf3SXKbf4xDHBO2X2BUTfKLmk5sd8oKndxv'
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision'})

/**
 * getExchanges
 * @returns {Promise<Exchange>}
 */
const getExchanges = async () => {
  const exchange = await Exchange.find();
  return exchange;
};

const getExchangeById = async (id) => {
  const exchange = await Exchange.findOne({ _id: id });
  return exchange;
};


const getPriceByAssetAllExchanges = async (coinId) => {
  const exchanges = await Exchange.find();
  const prices = [];

  for (const exchange of exchanges) {
    if(exchange?.active){
      if(exchange?.api_url && exchange?.name==="Binance"){
        const response = await client.avgPrice(coinId+'usdt')
        if(response && response.status === 200) prices.push({
          id: exchange._id,
          name: exchange.name,
          price: response.data.price
        })
      } else if(exchange.name==="Kraken"){
        const {data : krakenResponse, status } = await ApiCall({
          base: exchange.api_url,
          path: '/0/public/Ticker',
          method: 'get',
          params: {
            pair: coinId+'usdt'
          }
        })
        if(krakenResponse && status === 200){
          prices.push({
            id: exchange._id,
            name: exchange.name,
            price: krakenResponse.result[Object.keys(krakenResponse.result)[0]].a[0]
          }
          )
        }
      } else if(exchange.name==="Buda"){
        const {data : budaResponse, status } = await ApiCall({
          base: exchange.api_url,
          path: '/markets/'+coinId+'-usdt/ticker',
          method: 'get'
        })
        if(budaResponse && status === 200){
          prices.push({
            id: exchange._id,
            name: exchange.name,
            price: budaResponse.last_price[0]
          })
        }
      } else if(exchange.name==="Bitstamp"){
        const {data : bitstampResponse, status } = await ApiCall({
          base: exchange.api_url,
          path: '/ticker/'+coinId+'usdt',
          method: 'get'
        })
        if(bitstampResponse && status === 200){
          prices.push({
            id: exchange._id,
            name: exchange.name,
            price: bitstampResponse.ask
          })
        }
      }
    }
  }
  return prices;
};

const quoteBuyAsset = async (exchangeId, coinId, amount) => {
  const exchange = await Exchange.findOne({_id: exchangeId});
  if(exchange?.name === "Binance"){
    const params = {
      fromAsset: 'USDT',
      toAsset: coinId,
      fromAmount: amount,
      walletType: 'FUNDING'
    }
    const binanceSignatureTimestamp = SignatureAndTimestampBinance(params)
    const {data : binanceResponse, status } = await ApiCall({
      base: exchange.api_url,
      path: '/sapi/v1/convert/getQuote',
      api_key: exchange.api_key,
      params: {
        ...params,
        signature: binanceSignatureTimestamp.signature,
        timestamp: binanceSignatureTimestamp.timestamp
      },
      method: 'post'
    })
    if(binanceResponse && status === 200){
      return binanceResponse;
    }
  }
};

const acceptQuoteBuyAsset = async (exchangeId, quoteId) => {
  const exchange = await Exchange.findOne({_id: exchangeId});
  if(exchange?.name === "Binance"){
    const {data : binanceResponse, status } = await ApiCall({
      base: exchange.api_url,
      path: '/sapi/v1/convert/acceptQuote',
      params: {
        quoteId: quoteId
      },
      method: 'post'
    })
    if(binanceResponse && status === 200){
      await SwapRequest.create({
        "orderId": binanceResponse.orderId,
        "createTime":binanceResponse.createTime,
        "orderStatus":binanceResponse.orderStatus //PROCESS/ACCEPT_SUCCESS/SUCCESS/FAIL
      })
      return binanceResponse;
    }
  }
};

const syncSwapRequest = async (orderId) => {
  const swapRequests = await SwapRequest.findOne({orderId: orderId, status: "PROCESS"});
  const {data : binanceResponse, status } = await ApiCall({
    base: swapRequests.exchange.api_url,
    path: '/sapi/v1/convert/orderId',
    params: {
      orderId: orderId
    },
    method: 'get'
  })
  if(binanceResponse && status === 200){
    await SwapRequest.updateOne({orderId: orderId}, binanceResponse)
    return binanceResponse;
  }
}



module.exports = {
  getExchanges,
  getExchangeById,
  getPriceByAssetAllExchanges,
  quoteBuyAsset,
  acceptQuoteBuyAsset,
  syncSwapRequest
};
