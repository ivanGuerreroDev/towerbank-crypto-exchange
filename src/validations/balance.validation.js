const Joi = require('joi');

const getExchangeBalancesByCrypto = {
  body: Joi.object().keys({
    coin: Joi.string().required(),
  }),
};

module.exports = {
  getExchangeBalancesByCrypto,
};
