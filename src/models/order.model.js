const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const orderSchema = mongoose.Schema(
  {
    _id: mongoose.ObjectId,
    symbol: {
      type: String,
      required: true
    },
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    clientOrderId: {
      type: String,
      required: true
    },
    transactTime: {
      type: Number,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    origQty: {
      type: String,
      required: true
    },
    executedQty: {
      type: String,
      required: true
    },
    cummulativeQuoteQty: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    side: {
      type: String,
      required: true
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
orderSchema.plugin(toJSON);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
