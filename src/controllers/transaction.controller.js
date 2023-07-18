const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { transactionService } = require('../services');

const getTransactions = catchAsync(async (req, res) => {
  const { crypto, page, limit } = req.query;
  const history = await transactionService.getTransactions(crypto, page, limit);
  res.status(httpStatus.ACCEPTED).send(history);
});

module.exports = {
  getTransactions,
};
