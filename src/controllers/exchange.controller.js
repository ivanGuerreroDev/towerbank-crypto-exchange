const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { exchangeService } = require('../services');

const getExchanges = catchAsync(async (req, res) => {
  const exchanges = await exchangeService.getExchanges();
  res.status(httpStatus.ACCEPTED).send(exchanges);
});
const getExchangeById = catchAsync(async (req, res) => {
  const {id} = req.params
  const exchanges = await exchangeService.getExchangeById(id);
  res.status(httpStatus.ACCEPTED).send(exchanges);
});

const getpriceByPairAllExchanges = catchAsync(async (req, res) => {
  const { pair } = req.params
  const prices = await exchangeService.getpriceByPairAllExchanges(pair);
  res.status(httpStatus.ACCEPTED).send(prices);
});

const quoteBuyAsset = catchAsync(async (req, res) => {
  const { pair, exchangeId, amount } = req.body
  const prices = await exchangeService.quoteBuyAsset(exchangeId, pair, amount);
  res.status(httpStatus.ACCEPTED).send(prices);
});

const acceptQuoteBuyAsset = catchAsync(async (req, res) => {
  const { quoteId } = req.body
  const response = await exchangeService.acceptQuoteBuyAsset(quoteId);
  res.status(httpStatus.ACCEPTED).send(response);
});


const syncSwapRequest = catchAsync(async (req, res) => {
  const { orderId } = req.body
  const response = await exchangeService.syncSwapRequest(orderId);
  res.status(httpStatus.ACCEPTED).send(response);
});


module.exports = {
  getExchanges,
  getExchangeById,
  getpriceByPairAllExchanges,
  quoteBuyAsset,
  acceptQuoteBuyAsset,
  syncSwapRequest
};
