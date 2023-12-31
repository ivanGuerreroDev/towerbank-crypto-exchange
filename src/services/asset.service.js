const httpStatus = require('http-status');
const { Asset } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * getAssets
 * @returns {Promise<Asset>}
 */
const getAssets = async () => {
  const assets = await Asset.find({active: true});
  return assets;
};

module.exports = {
  getAssets
};
