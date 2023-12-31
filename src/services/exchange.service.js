const httpStatus = require('http-status');
const { Exchange, SwapRequest, User, Order } = require('../models');
const ApiError = require('../utils/ApiError');
const { ApiCall, TowerbankApi, TowerbankToken } = require('../utils/Api');
const { Spot } = require('@binance/connector')
const { SignatureAndTimestampBinance } = require('../utils/SignatureBinance')
const apiKey = '3y3J5plnNMBF9T87bZIox9EqJLhnHeI8f6tjTxaSlPK4Ov0eWSTh35joNMsqIT4L'
const apiSecret = 'oIOV9vFZds2HdYCvNRn2bcAbr09QARellcHomH2KuMkhYpLSmQbuQWK6FfPu1K4W'
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision' })
const mongoose = require('mongoose');
const { deleteUserById } = require('./user.service');

const getExchanges = async () => {
  const exchange = await Exchange.find();
  return exchange;
};

const getExchangeById = async (id) => {
  const exchange = await Exchange.findById(new mongoose.Types.ObjectId(id.trim()));
  return exchange;
};

const getpriceByPairAllExchanges = async (pair) => {
  const exchanges = await Exchange.find({ active: true });
  const prices = [];
  for (const exchange of exchanges) {
    const pairArr = pair.split("/");
    if (exchange.api_url && exchange.name === "Binance") {
      const response = await client.avgPrice(pairArr[1].toUpperCase() + pairArr[0].toUpperCase())
      if (response && response.status === 200) prices.push({
        id: exchange._id,
        name: exchange.name,
        price: parseFloat(response?.data?.price)
      })
    } else if (exchange.name === "Kraken") {
      try {
        const { data: krakenResponse, status } = await ApiCall({
          base: exchange.api_url,
          path: '/0/public/Ticker',
          method: 'get',
          params: {
            pair: pairArr[1] + pairArr[0]
          }
        })
        if (krakenResponse && status === 200) {
          prices.push({
            id: exchange._id,
            name: exchange.name,
            price: parseFloat(krakenResponse?.result[Object.keys(krakenResponse?.result)?.[0]]?.a?.[0])
          }
          )
        }
      } catch (e) {
        console.log(e)
      }
    } else if (exchange.name === "Buda") {
      try {
        const { data: budaResponse, status } = await ApiCall({
          base: exchange.api_url,
          path: '/markets/' + pairArr[1] + '-' + pairArr[0] + '/ticker',
          method: 'get'
        })
        if (budaResponse && status === 200) {
          console.log(budaResponse)
          prices.push({
            id: exchange._id,
            name: exchange.name,
            price: budaResponse.last_price[0]
          })
        }
      } catch (e) {
        console.log(e)
      }
    } else if (exchange.name === "Bitstamp") {
      try {
        const { data: bitstampResponse, status } = await ApiCall({
          base: exchange.api_url,
          path: '/ticker/' + pairArr[1]?.toLowerCase() + 'usd',
          method: 'get'
        })
        if (bitstampResponse && status === 200) {
          prices.push({
            id: exchange._id,
            name: exchange.name,
            price: parseFloat(bitstampResponse?.ask)
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
  return prices;
};

const newOrderTrade = async (userId, exchangeId, symbol, amount, side) => {
  const exchange = await Exchange.findById(new mongoose.Types.ObjectId(exchangeId.trim()));
  //if (validateBalanceForTrx(userId, amount)) {

    const transactTime = Date.now();
    const workingTime = Date.now();

    //if (exchange?.name === "Binance") {

      const response = {
        "symbol": symbol.replace('/', '').toUpperCase(),
        "orderId": Math.random(),
        "clientOrderId": userId,
        "transactTime": transactTime,
        "origQty": amount,
        "executedQty": amount,
        "status": "SUCCESS",
        "timeInForce": "GTC",
        "type": "MARKET",
        "side": side,
        "workingTime": workingTime
      };

      await Order.create({
        ...response,
        exchange: mongoose.Types.ObjectId(exchangeId.trim()),
        user: mongoose.Types.ObjectId(userId.trim()),
      })

      await transactionTowerbank(response, userId)

      return response;

      /*let params = {
        symbol: symbol.replace('/', '').toUpperCase(),
        side: side.toUpperCase(),
        type: 'MARKET',
        quoteOrderQty: amount.toString()
      }
      const binanceSignatureTimestamp = SignatureAndTimestampBinance(params)
      params = {
        ...params,
        signature: binanceSignatureTimestamp.signature,
        timestamp: binanceSignatureTimestamp.timestamp.toString()
      }
      const objString = '?' + new URLSearchParams(params).toString();
      const { data: binanceResponse, status } = await ApiCall({
        base: exchange.api_url,
        path: '/api/v3/order' + objString,
        api_key: exchange.api_key,
        method: 'post'
      })
      if (binanceResponse && status === 200) {
        await Order.create({
          ...binanceResponse,
          exchange: exchangeId,
          user: userId
        })
        if (binanceResponse.status === 'FILLED') {
          await transactionTowerbank(binanceResponse, userId)
        }
        return binanceResponse;
      }*/

    //} else {
    //  console.info(binanceResponse?.message)
    //  throw new ApiError(httpStatus.BAD_REQUEST, binanceResponse?.message || 'New Order Error');
    //}
  //} else {
  //  throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient funds');
  //}
}

const syncOrders = async () => {
  const orders = await Order.find({
    status: { "$nin": ["FILLED", "CANCELED", "REJECTED", "EXPIRED"] }
  });
  const exchangeData = await Exchange.findById(orders.exchange)
  for (const order of orders) {
    if (validateBalanceForTrx(order.user, order.cummulativeQuoteQty)) {
      const params = {
        symbol: order.symbol,
        orderId: parseInt(order.orderId)
      }
      const binanceSignatureTimestamp = SignatureAndTimestampBinance(params)
      const { data: binanceResponse, status: binanceSwapStatus } = await ApiCall({
        base: exchangeData.api_url,
        path: '/api/v3/order',
        params: {
          ...params,
          signature: binanceSignatureTimestamp.signature,
          timestamp: binanceSignatureTimestamp.timestamp.toString()
        },
        method: 'get'
      })
      const orderUpdatetData = await Order.updateOne({ orderId: order.orderId }, binanceResponse)
      if (orderUpdatetData.status === 'FILLED') {
        transactionTowerbank(binanceResponse, orderUpdatetData.user)
      }
    }
  }
}

const validateBalanceForTrx = async (userId, amount) => {
  const userData = await User.findById(userId)
  const { data: towerbankUserInfoResponse, status: towerbankTrxStatus } = await ApiCall({
    base: TowerbankApi,
    path: '/v1/account',
    headers: {
      'Authorization': "Bearer " + TowerbankToken,
      'User-Agent': 'PostmanRuntime/7.32.3'
    },
    method: 'get'
  })
  return amount <= towerbankUserInfoResponse?.balance
}

const transactionTowerbank = async (orderUpdatetData, userId) => {
  const userData = await User.findById(new mongoose.Types.ObjectId(userId.trim()))
  const { data: towerbankTrxResponse, status: towerbankTrxStatus } = await ApiCall({
    base: TowerbankApi,
    path: '/v1/transaction',
    data: {
      accountId: userData.towerbank_account_id,
      amount: parseFloat(orderUpdatetData.cummulativeQuoteQty),
      transactionType: orderUpdatetData.side === 'BUY' ? 'purchase' : orderUpdatetData.side === 'SELL' ? 'sale' : ''
    },
    headers: {
      'Authorization': "Bearer " + TowerbankToken,
      'User-Agent': 'PostmanRuntime/7.32.3'
    },
    method: 'post'
  })
  return towerbankTrxResponse
}

const quoteSwapRequest = async (exchangeId, pair, amount) => {
  const exchange = await Exchange.findById(new mongoose.Types.ObjectId(exchangeId.trim()));
  const pairArr = pair.split("/");
  if (exchange?.name === "Binance") {
    const params = {
      fromAsset: pairArr[1],
      toAsset: pairArr[0],
      fromAmount: amount.toString(),
      walletType: 'FUNDING'
    }
    const binanceSignatureTimestamp = SignatureAndTimestampBinance(params)
    const { data: binanceResponse, status } = await ApiCall({
      base: exchange.api_url,
      path: '/sapi/v1/convert/getQuote',
      api_key: exchange.api_key,
      params: {
        ...params,
        signature: binanceSignatureTimestamp.signature,
        timestamp: binanceSignatureTimestamp.timestamp.toString()
      },
      method: 'post'
    })
    if (binanceResponse && status === 200) {
      return binanceResponse;
    }
  }
};

const acceptQuoteAsset = async (userId, exchangeId, quoteId) => {
  const exchange = await Exchange.findById(new mongoose.Types.ObjectId(exchangeId.trim()));
  if (exchange?.name === "Binance") {
    // asset from sub account to master account

    // Accept swap of pair
    const params = {
      quoteId: quoteId
    }
    const binanceSignatureTimestamp = SignatureAndTimestampBinance(params)
    const { data: binanceResponse, status } = await ApiCall({
      base: exchange.api_url,
      path: '/sapi/v1/convert/acceptQuote',
      params: {
        ...params,
        signature: binanceSignatureTimestamp.signature,
        timestamp: binanceSignatureTimestamp.timestamp.toString()
      },
      method: 'post'
    })
    if (binanceResponse && status === 200) {
      await SwapRequest.create({
        "user": userId,
        "orderId": binanceResponse.orderId,
        "createTime": binanceResponse.createTime,
        "orderStatus": binanceResponse.orderStatus //PROCESS/ACCEPT_SUCCESS/SUCCESS/FAIL
      })
      return binanceResponse;
    }
  }
};

const syncSwapRequest = async (orderId) => {
  const swapRequests = await SwapRequest.findOne({ orderId: new mongoose.Types.ObjectId(orderId.trim()), status: "PROCESS" });
  const params = {
    orderId: orderId
  }
  const binanceSignatureTimestamp = SignatureAndTimestampBinance(params)
  const { data: binanceResponse, status: binanceSwapStatus } = await ApiCall({
    base: swapRequests.exchange.api_url,
    path: '/sapi/v1/convert/orderId',
    params: {
      ...params,
      signature: binanceSignatureTimestamp.signature,
      timestamp: binanceSignatureTimestamp.timestamp.toString()
    },
    method: 'post'
  })
  const swapRequestData = await SwapRequest.updateOne({ orderId: orderId }, binanceResponse)
  const userData = await User.findById(swapRequestData.user)
  const towerbank_account_id = userData.towerbank_account_id

  let amount, transactionType
  if (binanceResponse.toAsset === 'USDT') {
    amount = binanceResponse.toAmount
    transactionType = "purchase"
  }
  if (binanceResponse.from === 'USDT') {
    amount = binanceResponse.fromAmount
    transactionType = "sale"
  }

  const { data: towerbankTrxResponse, status: towerbankTrxStatus } = await ApiCall({
    base: TowerbankApi,
    path: '/v1/transaction',
    data: {
      accountId: towerbank_account_id,
      amount: parseFloat(amount),
      transactionType: transactionType
    },
    method: 'post'
  })

  if (
    binanceResponse && binanceSwapStatus === 200 &&
    towerbankTrxResponse && towerbankTrxStatus === 200
  ) {
    return binanceResponse;
  }
}

const getMontoMinByExchange = async (pair, exchangeId) => {
  const exchange = await Exchange.findById(new mongoose.Types.ObjectId(exchangeId.trim()));
  const montoMin = {pair:null, minSell:null, minBuy:null , exchange: null};
  const pairArr = pair.split("/");

  montoMin.exchange = exchange?.name;

  switch (exchange?.name) {
    case 'Binance':
      try {
        const { data: dataResponse, status } = await ApiCall({
          base: 'https://api.binance.com/api',
          path: '/v3/exchangeInfo',
          method: 'get'
        })
        if (dataResponse && status === 200) {
          const symbols = dataResponse.symbols;
          const symbolInfo = symbols.find((symbol) => symbol.symbol === pairArr[0]+pairArr[1]);

          if (!symbolInfo) {
            montoMin.pair = pair;
            return montoMin;
          }
          // Obtener los montos mínimos de una transacción de compra y venta
          const lotSizeFilter = symbolInfo.filters.find((filter) => filter.filterType === 'LOT_SIZE');
          const minNotionalFilter = symbolInfo.filters.find((filter) => filter.filterType === 'NOTIONAL');

          const minQty = parseFloat(lotSizeFilter.minQty);
          const minNotional = parseFloat(minNotionalFilter.minNotional);

          montoMin.pair = pair;
          montoMin.minBuy = minNotional;
          montoMin.minSell = minQty;

        }
      } catch (e) {
        console.log(e)
      }
      break;

    case 'Kraken':
      try {
        const { data: dataResponse, status } = await ApiCall({
          base: 'https://api.kraken.com/0',
          path: '/public/AssetPairs',
          method: 'get'
        })
        if (dataResponse && status === 200) {
          const pairs = dataResponse.result;
          const pairFiltr =pairArr[0]+pairArr[1];
          const symbolInfo = pairs[pairFiltr];

          if (!symbolInfo) {
            montoMin.pair = pair;
            return montoMin;
          }
          // Obtener los montos mínimos de una transacción de compra y venta
          const minQty = parseFloat(symbolInfo.lot_decimals);
          const minNotional = parseFloat(symbolInfo.ordermin);

          montoMin.pair = pair;
          montoMin.minBuy = minNotional;
          montoMin.minSell = minQty;

        }
      } catch (e) {
        console.log(e)
      }
      break;

    case 'Buda':
      try {
        const { data: dataResponse, status } = await ApiCall({
          base: 'https://www.buda.com/api',
          path: '/v2/markets',
          method: 'get'
        })
        if (dataResponse && status === 200) {
          const markets = dataResponse.markets;
          const pairFiltr =pairArr[0]+'-'+pairArr[1];

          const marketInfo = markets.find((market) => market.id === pairFiltr);

          if (!markets || markets.length === 0) {
            montoMin.pair = pair;
            return montoMin;
          }
          // Obtener los montos mínimos de una transacción de compra y venta
          const lotSizeFilter = {
            minQty: parseFloat(marketInfo.min_amount),
          };

          const minNotionalFilter = {
            minNotional: parseFloat(marketInfo.min_total),
          };

          const minNotional = parseFloat(symbolInfo.ordermin);

          montoMin.pair = pair;
          montoMin.minBuy = lotSizeFilter.minQty;
          montoMin.minSell =  minNotionalFilter.minNotional;

        }
      } catch (e) {
        console.log(e)
      }
      break;

    case 'Bitstamp':
      try {
        const { data: dataResponse, status } = await ApiCall({
          base: 'https://www.bitstamp.net/api',
          path: '/v2/trading-pairs-info/',
          method: 'get'
        })
        if (dataResponse && status === 200) {

          const tradingPairs  = dataResponse;
          const pairInfo = tradingPairs.find((pairInfo) => pairInfo.name === pair);


          if (!tradingPairs || tradingPairs.length === 0 || !pairInfo) {
            montoMin.pair = pair;
            return montoMin;
          }
          // Obtener los montos mínimos de una transacción de compra y venta
          const minimumOrder = parseFloat(pairInfo.minimum_order.split(' ')[0]);

          montoMin.pair = pair;
          montoMin.minBuy = minimumOrder;
          montoMin.minSell =  minimumOrder;

        }
      } catch (e) {
        console.log(e)
      }
      break;
  }
  return montoMin;
};


module.exports = {
  getExchanges,
  getExchangeById,
  getpriceByPairAllExchanges,
  quoteSwapRequest,
  acceptQuoteAsset,
  syncSwapRequest,
  newOrderTrade,
  syncOrders,
  getMontoMinByExchange,
};
