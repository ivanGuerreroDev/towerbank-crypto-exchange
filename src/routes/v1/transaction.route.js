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

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Crypto transactions
 */

/**
 * @swagger
 * /transaction/quoteBuyAsset/:
 *   post:
 *     summary: Quote buy asset
 *     description: Quote buy asset.
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - coinId
 *               - exchangeId
 *               - amount
 *             properties:
 *               coinId:
 *                 type: string
 *               exchangeId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Exchange'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /transaction/acceptQuoteBuyAsset/:
 *   post:
 *     summary: Accept quote buy asset
 *     description: Accept quote buy asset.
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quoteId
 *             properties:
 *               quoteId:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Exchange'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */


/**
 * @swagger
 * /transaction/syncSwapRequest/:
 *   post:
 *     summary: Syncronize swap request
 *     description: Syncronize swap request.
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *             properties:
 *               orderId:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Exchange'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

