const httpStatus = require('http-status');
const { Exchange, SwapRequest, User } = require('../models');
const ApiError = require('../utils/ApiError');
const { ApiCall, TowerbankApi } = require('../utils/Api');
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


const getpriceByPairAllExchanges = async (pair) => {
  const exchanges = await Exchange.find();
  const prices = [];

  for (const exchange of exchanges) {
    if(exchange?.active){
      if(exchange?.api_url && exchange?.name==="Binance"){
        const pairArr = pair.split("/");
        const response = await client.avgPrice(pairArr[0]+pairArr[1])
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
            pair: pairArr[0]+pairArr[1]
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
          path: '/markets/'+pairArr[0]+'-'+pairArr[1]+'/ticker',
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
          path: '/ticker/'+pairArr[0]+pairArr[1],
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

const quoteSwapRequest = async (exchangeId, pair, amount) => {
  const exchange = await Exchange.findOne({_id: exchangeId});
  const pairArr = pair.split("/");
  if(exchange?.name === "Binance"){
    const params = {
      fromAsset: pairArr[1],
      toAsset: pairArr[0],
      fromAmount: amount,
      walletType: 'FUNDING'
    }
    const binanceSignatureTimestamp = SignatureAndTimestampBinance(params)
    const {data : binanceResponse, status } = await ApiCall({
      base: exchange.api_url,
      path: '/sapi/v1/convert/getQuote',
      api_key: exchange.api_key,
      data: {
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

const acceptQuoteAsset = async (userId, exchangeId, quoteId) => {
  const exchange = await Exchange.findOne({_id: exchangeId});
  if(exchange?.name === "Binance"){
    const {data : binanceResponse, status } = await ApiCall({
      base: exchange.api_url,
      path: '/sapi/v1/convert/acceptQuote',
      data: {
        quoteId: quoteId
      },
      method: 'post'
    })
    if(binanceResponse && status === 200){
      await SwapRequest.create({
        "user": userId,
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
  const {data : binanceResponse, status : binanceSwapStatus } = await ApiCall({
    base: swapRequests.exchange.api_url,
    path: '/sapi/v1/convert/orderId',
    data: {
      orderId: orderId
    },
    method: 'post'
  })
  const swapRequestData = await SwapRequest.updateOne({orderId: orderId}, binanceResponse)
  const userData = await User.findOne({_id: swapRequestData.user})
  const towerbank_account_id = userData.towerbank_account_id

  let amount, transactionType
  if(binanceResponse.toAsset === 'USDT') {
    amount = binanceResponse.toAmount
    transactionType = "purchase"
  }
  if(binanceResponse.from === 'USDT'){
    amount = binanceResponse.fromAmount
    transactionType = "sale"
  }

  const {data : towerbankTrxResponse, status : towerbankTrxStatus } = await ApiCall({
    base: TowerbankApi,
    path: '/v1/transaction',
    data: {
      accountId: towerbank_account_id,
      amount: parseFloat(amount),
      transactionType: transactionType
    },
    method: 'post'
  })

  if(
    binanceResponse && binanceSwapStatus === 200 &&
    towerbankTrxResponse && towerbankTrxStatus === 200
  ){
    return binanceResponse;
  }
}



module.exports = {
  getExchanges,
  getExchangeById,
  getpriceByPairAllExchanges,
  quoteSwapRequest,
  acceptQuoteAsset,
  syncSwapRequest,
};
