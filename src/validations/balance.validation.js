const Joi = require('joi');

const getBalancesByCrypto = {
  body: Joi.object().keys({
    coin: Joi.string().required(),
  }),
};

module.exports = {
  getBalancesByCrypto,
};
