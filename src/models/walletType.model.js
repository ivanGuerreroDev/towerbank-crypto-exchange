const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const walletTypeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    logo: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
walletTypeSchema.plugin(toJSON);

/**
 * @typedef WalletType
 */
const WalletType = mongoose.model('WalletType', walletTypeSchema);

module.exports = WalletType;
