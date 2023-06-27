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
module.exports = {
  getExhanges,
  quoteBuyAsset
};
