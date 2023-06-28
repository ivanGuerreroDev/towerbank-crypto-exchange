const httpStatus = require('http-status');
const { SubAccount, Exchange } = require('../models');
const ApiError = require('../utils/ApiError');
const { ApiCall } = require('../utils/Api');
const { Spot } = require('@binance/connector')
const { SignatureAndTimestampBinance } = require('../utils/SignatureBinance')
const { uuidv6: guiid } = require('uuid');

const getAllSubAccounts = async (userId) => {
  const AllSubAccounts = await SubAccount.filter({ user_id: userId });
  return AllSubAccounts;
};

const getSubAccountById = async (subAccountId) => {
  const exchange = await Exchange.filter({ _id: subAccountId });
  return exchange;
};

const addSubAccount = async (userId, subAccountString) => {
  const exchanges = await Exchange.find();
  for (const exchange of exchanges) {
    if (exchange?.active) {
      const apiKey = exchange.api_key;
      const baseUrl = exchange.api_url;
      const endpoint = getEndpoint(exchange.name);
      let params = {
        subAccountString
      };
      const binanceSignatureTimestamp = SignatureAndTimestampBinance(params)
      params = {
        ...params,
        signature: binanceSignatureTimestamp.signature,
        timestamp: binanceSignatureTimestamp.timestamp.toString()
      }
      const objString = '?' + new URLSearchParams(params).toString();
      const { data: binanceAddSubaccountResponse, status: binanceAddSubaccountStatus } = await ApiCall({
        base: baseUrl,
        path: endpoint + objString,
        api_key: apiKey,
        method: 'post'
      })
      if (binanceAddSubaccountResponse && binanceAddSubaccountStatus === 200) {
        SubAccount.create({
          user_id: userId,
          exchange: exchange._id,
          email: binanceAddSubaccountResponse.email,
        });
      }
    };
  }
}

function getEndpoint(exchange) {
  if (exchange?.toUpperCase() === 'BINANCE') {
    return '/sapi/v1/sub-account/virtualSubAccount';
  } else if (exchange?.toUpperCase() === 'kraken') {
    return '/0/private/subaccount';
  } else {
    throw new Error('Exchange no soportado');
  }
}


module.exports = {
  getAllSubAccounts,
  getSubAccountById,
  addSubAccount
};
