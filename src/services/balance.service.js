const { ApiCall, TowerbankApi, TowerbankToken } = require('../utils/Api');
const { Exchange } = require('../models');
const { Spot } = require('@binance/connector')
const apiKey = '3y3J5plnNMBF9T87bZIox9EqJLhnHeI8f6tjTxaSlPK4Ov0eWSTh35joNMsqIT4L'
const apiSecret = 'oIOV9vFZds2HdYCvNRn2bcAbr09QARellcHomH2KuMkhYpLSmQbuQWK6FfPu1K4W'
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision' })

const getExchangeBalancesByCrypto = async (coin) => {
  const exchanges = await Exchange.find({ active: true });
  const dteChanges = [];
  let crypto = coin;
  exchanges.forEach(function (exchange) {
    const factor = Math.random() * 10;
    const exc = {
      name: exchange.name,
      logo: exchange.logo,
      balance: parseFloat((500 * factor).toFixed(2)),
      balance_fiat: parseFloat((100 * factor).toFixed(2)),
    };
    dteChanges.push(exc);
  });

  const totalBalance = dteChanges.reduce((total, item) => total + item.balance, 0);
  const totalfit = dteChanges.reduce((totalf, item) => totalf + item.balance_fiat, 0);

  const balance = {
    total: {
      balance: parseFloat(totalBalance.toFixed(2)),
      balance_fiat: parseFloat(totalfit.toFixed(2)),
    },
    exchanges: dteChanges,
  };
  if (crypto !== coin) {
    crypto = coin;
  }

  return balance;
};

const getFiatBalance = async (accountId) => {
  const { data: towerbankUserInfoResponse } = await ApiCall({
    base: TowerbankApi,
    path: '/v1/account',
    headers: {
      Authorization: `Bearer ${TowerbankToken}`,
      'User-Agent': 'PostmanRuntime/7.32.3',
    },
    method: 'get',
  });
  const balance = {
    balance: towerbankUserInfoResponse.balance,
    account: accountId,
  };
  return balance;
};


module.exports = {
  getExchangeBalancesByCrypto,
  getFiatBalance,
};
