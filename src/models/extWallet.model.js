const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const extWalletSchema = mongoose.Schema(
  {
    asset: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Asset',
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    walletType: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'WalletType',
      required: true,
    },
    address: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
extWalletSchema.plugin(toJSON);

/**
 * @typedef ExtWallet
 */
const ExtWallet = mongoose.model('ExtWallet', extWalletSchema);

module.exports = ExtWallet;
