const Joi = require('joi');

const postTransferToSubAccount = {
  body: Joi.object().keys({
    exchangeId: Joi.string().required(),
    toEmail: Joi.string().required(),
    asset: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};

const postTransferToAccount = {
  body: Joi.object().keys({
    exchangeId: Joi.string().required(),
    asset: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};

module.exports = {
  postTransferToSubAccount,
  postTransferToAccount
};
