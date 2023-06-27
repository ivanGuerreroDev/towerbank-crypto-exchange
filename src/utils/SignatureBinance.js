const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../../.env') });
const envVars = process.env;
const hmacSHA256 = require('crypto-js/hmac-sha256');

function is_disabled(str) {
  return str == true;
}

function is_empty(str) {
  if (typeof str == 'undefined' ||
      !str ||
      str.length === 0 ||
      str === "" ||
      !/[^\s]/.test(str) ||
      /^\s*$/.test(str) ||
      str.replace(/\s/g,"") === "")
  {
      return true;
  }
  else
  {
      return false;
  }
}

const SignatureAndTimestampBinance = (params) => {

  const ts = Date.now();
  let paramsObject = {};
  const binance_api_secret = envVars.BINANCE_API_SECRET;
  params.timestamp = ts;
  const parameters = Object.keys(params).map((key) => ({key, value: params[key].toString()}));

  parameters.map((param) => {
    if (param.key != 'signature' &&
      !is_empty(param.value) &&
      !is_disabled(param.disabled)) {
      paramsObject[param.key] = param.value;
    }
  })
  let signature = ''
  if (binance_api_secret) {
    const queryString = Object.keys(paramsObject).map((key) => {
      return `${key}=${paramsObject[key]}`;
    }).join('&');
    console.log(queryString);
    signature = hmacSHA256(queryString, binance_api_secret).toString();
  }

  return ({ signature: signature, timestamp: ts })
}



module.exports.SignatureAndTimestampBinance = SignatureAndTimestampBinance
