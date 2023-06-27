const Joi = require('joi');

const getAllSubAccounts = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};
const getSubAccountsByAccountId = {
  body: Joi.object().keys({
    accountId: Joi.string().required(),
  }),
};
const getSubAccountById = {
  body: Joi.object().keys({
    subAccountId: Joi.string().required(),
  }),
};
const addSubAccount = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};
module.exports = {
  getAllSubAccounts,
  getSubAccountsByAccountId,
  getSubAccountById,
  addSubAccount
};
