const httpStatus = require('http-status');
const { SubAccount, Exchange } = require('../models');
const ApiError = require('../utils/ApiError');
const { ApiCall } = require('../utils/Api');
const { Spot } = require('@binance/connector')
const {SignatureAndTimestampBinance} = require('../utils/SignatureBinance')

const postTransferToSubAccount = async (exchangeId, toEmail, asset, amount) => {
  const exchange = await Exchange.findOne({ _id: exchangeId });
  const { toEmail, asset, amount } = req.body;
  const params = {
    toEmail,
    asset,
    amount
  };
  const binanceSignatureTimestamp = SignatureAndTimestampBinance(params)
  const { data: binanceResponse, status } = await ApiCall({
    base: exchange.api_url,
    path: '/sapi/v1/sub-account/transfer/subToMaster',
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

const postTransferToAccount = async (exchangeId, asset, amount) => {
  const exchange = await Exchange.findOne({ _id: exchangeId });
  const { toEmail, asset, amount } = req.body;
  const params = {
    asset,
    amount
  };
  const binanceSignatureTimestamp = SignatureAndTimestampBinance(params)
  const { data: binanceResponse, status } = await ApiCall({
    base: exchange.api_url,
    path: '/sapi/v1/sub-account/transfer/subToMaster',
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

module.exports = {
  postTransferToSubAccount,
  postTransferToAccount
};
