const httpStatus = require('http-status');
const { SubAccount, Exchange } = require('../models');
const ApiError = require('../utils/ApiError');
const { ApiCall } = require('../utils/Api');
const { Spot } = require('@binance/connector')
const {SignatureAndTimestampBinance} = require('../utils/SignatureBinance')
const { uuidv6: guiid } = require('uuid');

const getAllSubAccounts = async (userId) => {
  const AllSubAccounts = await SubAccount.filter({_userId: userId});
  return AllSubAccounts;
};

const getSubAccountsByAccountId = async (accountId) => {
  const exchange = await Exchange.filter({_accountId: accountId});
  return exchange;
};

const getSubAccountById = async (subAccountId) => {
  const exchange = await Exchange.filter({_subAccountId: subAccountId});
  return exchange;
};

const addSubAccount = async (userId) => {

  const exchanges = await Exchange.find();

  for (const exchange of exchanges) {

    if(exchange?.active){

      const apiKey = exchange.api_key;
      const baseUrl =  exchange.api_url;
      const endpoint = getEndpoint(exchange.name);

      // Obtenemos los parámetros enviados en la solicitud
      const { email, isFreeze } = req.body;

      // Configuramos los parámetros necesarios para la solicitud a la API correspondiente
      const params = {
        email,
        isFreeze
      };

      // Generamos el timestamp y el signature para la solicitud
      const timestamp = Date.now();
      const queryString = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&');
      const binanceSignatureTimestamp = SignatureAndTimestampBinance(queryString)

      // Realizamos la solicitud POST a la API correspondiente para crear la subcuenta
      const response = await axios.post(`${baseUrl}${endpoint}`, null, {
        headers: {
          'X-MBX-APIKEY': apiKey,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          ...params,
          timestamp,
          binanceSignatureTimestamp
        }
      });

      if(response.data){

        switch (Exchange.name) {
          case "Binance":

            SubAccount.create({
              user_id: userId,
              sub_account_id: guiid(),

            });

            break;
          case "Kraken":

            SubAccount.create({
              user_id: userId,
              sub_account_id: guiid(),

            });


            break;

        }

      }

    };
  }
}

function getEndpoint(exchange) {
  if (exchange === 'binance') {
    return '/sapi/v1/sub-account/virtualSubAccount';
  } else if (exchange === 'kraken') {
    return '/0/private/subaccount';
  } else {
    throw new Error('Exchange no soportado');
  }
}


module.exports = {
  getAllSubAccounts,
  getSubAccountsByAccountId,
  getSubAccountById,
  addSubAccount
};
