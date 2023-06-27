const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { exchangeService } = require('../services');

const getExchanges = catchAsync(async (req, res) => {
  const exchanges = await exchangeService.getExchanges();
  res.status(httpStatus.ACCEPTED).send(exchanges);
});
const getPriceByAssetAllExchanges = catchAsync(async (req, res) => {
  const { coinId } = req.params
  const prices = await exchangeService.getPriceByAssetAllExchanges(coinId);
  res.status(httpStatus.ACCEPTED).send(prices);
});

const quoteBuyAsset = catchAsync(async (req, res) => {
  const { coinId, exchangeId, amount } = req.body
  const prices = await exchangeService.quoteBuyAsset(exchangeId, coinId, amount);
  res.status(httpStatus.ACCEPTED).send(prices);
});



module.exports = {
  getExchanges,
  getPriceByAssetAllExchanges,
  quoteBuyAsset
};
