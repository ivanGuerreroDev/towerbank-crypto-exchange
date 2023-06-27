
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { subAccountService } = require('../services');


const getAllSubAccounts =  catchAsync(async (req, res) => {
  const { userId } = req.body
  const subAccounts = await subAccountService.getAllSubAccounts(userId);
  res.status(httpStatus.ACCEPTED).send(subAccounts);
});

const getSubAccountsByAccountId =  catchAsync(async (req, res) => {
  const {AccountId} = req.body
  const subAccountsByAccount = await subAccountService.getSubAccountByAccountId(AccountId);
  res.status(httpStatus.ACCEPTED).send(subAccountsByAccount);
});

const getSubAccountById =  catchAsync(async (req, res) => {
  const { userId, subAccountId } = req.body
  const subAccount = await subAccountService.getSubAccountById(userId,subAccountId);
  res.status(httpStatus.ACCEPTED).send(subAccount);
});

const addSubAccount =  catchAsync(async (req, res) => {
  const { userId } = req.body
  const subAccounts = await subAccountService.addSubAccount(userId);
  res.status(httpStatus.ACCEPTED).send(subAccounts);
});


module.exports = {
  getAllSubAccounts,
  getSubAccountsByAccountId,
  getSubAccountById,
  addSubAccount
};
