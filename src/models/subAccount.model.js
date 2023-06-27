const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const subAccountSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    subAccountId: {
      type: String,
      required: true,
    },
    accountId: {
      type: String,
      required: true,
    },
    exchangeId: {
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
subAccountSchema.plugin(toJSON);

/**
 * @typedef subAccount
 */
const subAccount = mongoose.model('subAccount', subAccountSchema);

module.exports = subAccount;
