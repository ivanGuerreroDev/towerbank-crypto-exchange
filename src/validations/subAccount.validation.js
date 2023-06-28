const Joi = require('joi');

const getAllSubAccounts = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
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
    subAccountString: Joi.string().required(),
  }),
};
module.exports = {
  getAllSubAccounts,
  getSubAccountById,
  addSubAccount
};
