const Joi = require('joi');

const postTransferToSubAccount = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    exchangeId: Joi.string().required(),
    toEmail: Joi.string().required(),
    asset: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};

module.exports = {
  postTransferToSubAccount
};
