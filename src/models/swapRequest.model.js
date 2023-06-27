const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const swapRequestSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true
    },
    createTime: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    fromAsset: {
      type: String
    },
    fromAmount: {
      type: String
    },
    toAsset: {
      type: String
    },
    toAmount: {
      type: String
    },
    ratio: {
      type: String
    },
    inverseRatio: {
      type: String
    },
    exchange: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Exchange',
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
swapRequestSchema.plugin(toJSON);

/**
 * @typedef Exchange
 */
const SwapRequest = mongoose.model('SwapRequest', swapRequestSchema);

module.exports = SwapRequest;
