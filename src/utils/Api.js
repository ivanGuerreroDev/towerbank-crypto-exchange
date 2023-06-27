const axios = require('axios');

const TowerbankApi = "https://towerbank.bankathontb.com/bankathon"
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
    console.log("@@config", config)
    const response = axios(config)

    return response
  } catch (error) {

    console.error(error.response.error)
  }

}

module.exports.TowerbankApi = TowerbankApi
module.exports.ApiCall = ApiCall
