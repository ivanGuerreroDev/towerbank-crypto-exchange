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
  const { pair } = req.query
  const prices = await exchangeService.getpriceByPairAllExchanges(pair);
  res.status(httpStatus.ACCEPTED).send(prices);
});

const newOrder = catchAsync(async (req, res) => {
  const { userId, exchangeId, symbol, amount, side } = req.body
  const order = await exchangeService.newOrderTrade(userId, exchangeId, symbol, amount, side);
  res.status(httpStatus.ACCEPTED).send(order);
});

const quoteSwapRequest = catchAsync(async (req, res) => {
  const { pair, exchangeId, amount } = req.body
  const prices = await exchangeService.quoteSwapRequest(exchangeId, pair, amount);
  res.status(httpStatus.ACCEPTED).send(prices);
});

const acceptQuoteAsset = catchAsync(async (req, res) => {
  const { quoteId, userId, exchangeId } = req.body
  const response = await exchangeService.acceptQuoteAsset(userId, exchangeId, quoteId);
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
  quoteSwapRequest,
  acceptQuoteAsset,
  syncSwapRequest,
  newOrder
}
