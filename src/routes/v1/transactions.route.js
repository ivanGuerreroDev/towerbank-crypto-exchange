const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const exchangeValidation = require('../../validations/exchange.validation');
const exchangeController = require('../../controllers/exchange.controller');

const router = express.Router();

router
  .route('/quoteBuyAsset')
  .post(validate(exchangeValidation.quoteBuyAsset), exchangeController.quoteBuyAsset);

router
  .route('/acceptQuoteBuyAsset')
  .post(validate(exchangeValidation.acceptQuoteBuyAsset), exchangeController.acceptQuoteBuyAsset);

router
  .route('/syncSwapRequest')
  .post(validate(exchangeValidation.syncSwapRequest), exchangeController.syncSwapRequest);

module.exports = router;
