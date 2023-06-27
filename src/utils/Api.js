const axios = require('axios');

const TowerbankApi = "https://towerbank.bankathontb.com/bankathon"
const TowerbankToken = "86e7b63e-a39a-4774-90eb-c1fdb364fed0!bb672194c75c6e85b7aecb76d5afabd0f37e2de8498d2c6e7ec50b48e20efba8352dbe170e5d91"
const ApiCall = ({
  base,
  path,
  headers = {},
  method,
  data,
  api_key,
  params
}) => {
  const config = {
    method: method,
    url: base+path,
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  }
  if(data) config.data = data
  if(params) config.params = params
  if(api_key) config.headers["X-MBX-APIKEY"] = api_key
  try {
    console.log("@@ config ", config)
    const response = axios(config)

    return response
  } catch (error) {

    console.error(error.response.error)
  }

}

module.exports.TowerbankApi = TowerbankApi
module.exports.TowerbankToken = TowerbankToken
module.exports.ApiCall = ApiCall
