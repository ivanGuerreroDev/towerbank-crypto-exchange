const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const newOrder = {
  body: Joi.object().keys({
    userId: Joi.string().required(),
    exchangeId: Joi.string().required(),
    quoteId: Joi.string().required()
  }),
}

module.exports = {
  newOrder
};
