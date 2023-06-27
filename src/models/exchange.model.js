const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const exchangeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    api_key: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
exchangeSchema.plugin(toJSON);

/**
 * @typedef Exchange
 */
const Exchange = mongoose.model('Exchange', exchangeSchema);

module.exports = Exchange;
