const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { extWalletService } = require('../services');

const getExtWallets = catchAsync(async (req, res) => {
  // const { _id as userId } = req.user
  const userId = '649b8c21e22f006c8049e037'
  const wallets = await extWalletService.extWallets(userId);
  if(wallets) return res.status(httpStatus.ACCEPTED).send(wallets);
  return res.status(httpStatus.BAD_REQUEST).send('No Wallets Found');
});

const createExtWallet = catchAsync(async (req, res) => {
  const { address, symbol, name, walletType } = req.body
  // const { _id as userId } = req.user
  const userId = '649b8c21e22f006c8049e037'
  const validateAddress = await extWalletService.validateExtWallets(address, symbol);
  if(validateAddress){
    const wallet = await extWalletService.createExtWallet(userId, address, symbol, name, walletType);
    return res.status(httpStatus.ACCEPTED).send(wallet);
  }else{
    return res.status(httpStatus.BAD_REQUEST).send('Invalid Address');
  }
});

const deleteExtWallet = catchAsync(async (req, res) => {
  const { extWallet } = req.body
  // const { _id as userId } = req.user
  const userId = '649b8c21e22f006c8049e037'
  const wallet = await extWalletService.deleteExtWallet(extWallet, userId);
  if(wallet.ok){
    return res.status(httpStatus.ACCEPTED).send('Wallet Deleted');
  }else{
    return res.status(httpStatus.BAD_REQUEST).send('Invalid Wallet');
  }
});


module.exports = {
  getExtWallets,
  createExtWallet,
  deleteExtWallet
};
