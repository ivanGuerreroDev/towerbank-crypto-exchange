const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { balanceService } = require('../services');

const getBalancesByCrypto = catchAsync(async (req, res) => {
  const { coin } = req.query;
  const balances = await balanceService.getBalancesByCrypto(coin);
  res.status(httpStatus.ACCEPTED).send(balances);
});

module.exports = {
  getBalancesByCrypto,
};
