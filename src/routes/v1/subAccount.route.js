
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



/**
 * @swagger
 * tags:
 *   name: SubAccount
 *   description: Sub Account Users
 */

/**
 * @swagger
 * /subAccount/getAllSubAccounts/{userId}:
 *   get:
 *     summary: Get all sub account by user
 *     description: Get all sub account by user.
 *     tags: [SubAccount]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/SubAccount'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */


/**
 * @swagger
 * /subAccount/getSubAccountsByAccountId/{accountId}:
 *   get:
 *     summary: Get all sub account by Account Id
 *     description: Get all sub account by Account Id.
 *     tags: [SubAccount]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *         description: Account id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/SubAccount'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /subAccount/getSubAccountById/{subAccountId}:
 *   get:
 *     summary: Get all sub account by Sub Account Id
 *     description: Get all sub account by Sub Account Id.
 *     tags: [SubAccount]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subAccountId
 *         required: true
 *         schema:
 *           type: string
 *         description: Sub Account id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/SubAccount'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /subAccount/addSubAccount/{userId}:
 *   post:
 *     summary: Create the sub account by user Id
 *     description: Create the sub account by user Id.
 *     tags: [SubAccount]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/SubAccount'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

