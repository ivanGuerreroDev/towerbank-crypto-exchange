const httpStatus = require('http-status');
const { Exchange, SwapRequest, User, Order, ExtWallet, Asset } = require('../models');
const ApiError = require('../utils/ApiError');
const { ApiCall, TowerbankApi, TowerbankToken } = require('../utils/Api');
const WAValidator = require('wallet-address-validator');
const mongoose = require('mongoose');


const extWallets = async (user) => {
  const wallet = await ExtWallet.find({user: new mongoose.Types.ObjectId(user.trim())}).populate('asset').populate('walletType');
  return wallet;
}

const createExtWallet = async (user, address, symbol, name, walletType) => {
  const asset = await Asset.findOne({ symbol: symbol });
  const wallet = await new ExtWallet({
    asset: asset._id,
    address: address,
    user: new mongoose.Types.ObjectId(user.trim()),
    name: name,
    walletType: new mongoose.Types.ObjectId(walletType.trim())
  });
  return wallet.save();
}

const validateExtWallets = async (address, symbol) => {
  var valid = WAValidator.validate(address, symbol);
  return valid
}

const deleteExtWallet = async (extWallet, user) => {
  const deleteWallet = await ExtWallet.deleteOne({
    _id: new mongoose.Types.ObjectId(extWallet),
    user: new mongoose.Types.ObjectId(user)
  });
  return deleteWallet;
}


module.exports = {
  extWallets,
  createExtWallet,
  validateExtWallets,
  deleteExtWallet
};
