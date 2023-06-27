const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { assetService } = require('../services');

const getAssets = catchAsync(async (req, res) => {
  const assets = await assetService.getAssets();
  res.status(httpStatus.ACCEPTED).send(assets);
});

module.exports = {
  getAssets
};
