const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const subAccountSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    exchange_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Exchange',
      required: true,
    },
    email: {
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
