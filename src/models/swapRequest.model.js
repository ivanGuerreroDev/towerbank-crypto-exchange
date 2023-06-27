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
