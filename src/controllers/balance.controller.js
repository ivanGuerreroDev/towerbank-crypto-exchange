const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { balanceService } = require('../services');

const getExchangeBalancesByCrypto = catchAsync(async (req, res) => {
  const { coin } = req.query;
  const balances = await balanceService.getExchangeBalancesByCrypto(coin);
  res.status(httpStatus.ACCEPTED).send(balances);
});

const getFiatBalance = catchAsync(async (req, res) => {
  const { accountId } = req.query;
  const balance = await balanceService.getFiatBalance(accountId);
  res.status(httpStatus.ACCEPTED).send(balance);
});

module.exports = {
  getExchangeBalancesByCrypto,
  getFiatBalance,
};
