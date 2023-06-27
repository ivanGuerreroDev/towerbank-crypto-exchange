
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const subAccountValidation = require('../../validations/subAccount.validation');
const subAccountController = require('../../controllers/subAccount.controller');

const router = express.Router();


router
  .route('/getAllSubAccounts/:userId')
  .post(validate(subAccountValidation.getAllSubAccounts), subAccountController.getAllSubAccounts);

router
  .route('/getSubAccountsByAccountId/:accountId')
  .post(validate(subAccountValidation.getSubAccountsByAccountId), subAccountController.getSubAccountsByAccountId);

router
  .route('/getSubAccountById/:subAccountId')
  .post(validate(subAccountValidation.getSubAccountById), subAccountController.getSubAccountById);

router
  .route('/addSubAccount/:userId')
  .post(validate(subAccountValidation.addSubAccount), subAccountController.addSubAccount);


module.exports = router;
