const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const subAccountSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    sub_account_id: {
      type: String,
      required: true,
    },
    account_id: {
      type: String,
      required: true,
    },
    exchange_id: {
      type: String,
      required: true,
    },
    is_freeze: {
      type: Boolean,
      required: true,
    },
    create_time: {
      type: String,
      required: true,
    },
    is_managed_sub_account: {
      type: Boolean,
      required: true,
    },
    is_asset_management_sub_account: {
      type: Boolean,
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
