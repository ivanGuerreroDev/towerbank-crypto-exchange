const Joi = require('joi');

const getExhanges = {

};

const newOrder = {
  body: Joi.object().keys({
    symbol: Joi.string().required(),
    side: Joi.string().required(),
    type: Joi.string().required(),
    quoteOrderQty: Joi.number()
  }),
}

const quoteSwapRequest = {
  body: Joi.object().keys({
    pair: Joi.string().required(),
    exchangeId: Joi.string().required(),
    amount: Joi.number().required()
  }),
}

const acceptQuoteAsset = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    exchangeId: Joi.string().required(),
    quoteId: Joi.string().required()
  }),
}

const syncSwapRequest = {
  body: Joi.object().keys({
    orderId: Joi.string().required()
  }),
}

module.exports = {
  newOrder,
  getExhanges,
  quoteSwapRequest,
  acceptQuoteAsset,
  syncSwapRequest
};
