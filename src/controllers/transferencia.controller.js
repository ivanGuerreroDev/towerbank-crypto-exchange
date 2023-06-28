
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { transferenciaService } = require('../services');

const postTransferToSubAccount =  catchAsync(async (req, res) => {
  const { exchangeId, toEmail, asset, amount} = req.body
  const tranferenciaId = await transferenciaService.postTransferToSubAccount(exchangeId, toEmail, asset, amount);
  res.status(httpStatus.ACCEPTED).send(tranferenciaId);
});

const postTransferToAccount =  catchAsync(async (req, res) => {
  const { exchangeId, asset, amount} = req.body
  const tranferenciaId = await transferenciaService.postTransferToAccount(exchangeId, asset, amount);
  res.status(httpStatus.ACCEPTED).send(tranferenciaId);
});


module.exports = {
  postTransferToSubAccount,
  postTransferToAccount
};
