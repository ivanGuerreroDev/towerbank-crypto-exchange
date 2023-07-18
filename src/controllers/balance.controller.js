const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { balanceService } = require('../services');

const getBalancesByCrypto = catchAsync(async (req, res) => {
  const { coin } = req.query;
  const balances = await balanceService.getBalancesByCrypto(coin);
  res.status(httpStatus.ACCEPTED).send(balances);
});

const getBalanceByAccount = catchAsync(async (req, res) => {
  const { accountId } = req.query;
  const balance = await balanceService.getBalanceByAccount(accountId);
  res.status(httpStatus.ACCEPTED).send(balance);
});

module.exports = {
  getBalancesByCrypto,
  getBalanceByAccount,
};
