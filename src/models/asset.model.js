const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const assetSchema = mongoose.Schema(
  {
    _id: mongoose.ObjectId,
    name: {
      type: String,
      required: true
    },
    symbol: {
      type: String,
      required: true,
      index: true,
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
