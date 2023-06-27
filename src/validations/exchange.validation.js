const Joi = require('joi');

const getExhanges = {

};
const quoteBuyAsset = {
  body: Joi.object().keys({
    coinId: Joi.string().required(),
    exchangeId: Joi.string().required(),
    amount: Joi.number().required()
  }),
}

const acceptQuoteBuyAsset = {
  body: Joi.object().keys({
    quoteId: Joi.string().required()
  }),
}

const syncSwapRequest = {
  body: Joi.object().keys({
    orderId: Joi.string().required()
  }),
}

module.exports = {
  getExhanges,
  quoteBuyAsset,
  acceptQuoteBuyAsset,
  syncSwapRequest
};
