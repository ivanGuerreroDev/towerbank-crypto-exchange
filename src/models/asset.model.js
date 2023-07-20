const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const assetSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    symbol: {
      type: String,
      required: true,
      index: true,
    },
    logo: {
      type: String,
      required: true
    },
    logo_blank: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
assetSchema.plugin(toJSON);

/**
 * @typedef Asset
 */
const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
