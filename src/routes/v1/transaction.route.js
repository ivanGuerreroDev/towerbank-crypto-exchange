const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const exchangeValidation = require('../../validations/exchange.validation');
const exchangeController = require('../../controllers/exchange.controller');

const router = express.Router();

router
  .route('/newOrder')
  .post(validate(exchangeValidation.newOrder), exchangeController.newOrder);

router
  .route('/quoteSwapRequest')
  .post(validate(exchangeValidation.quoteSwapRequest), exchangeController.quoteSwapRequest);

router
  .route('/acceptQuoteAsset')
  .post(validate(exchangeValidation.acceptQuoteAsset), exchangeController.acceptQuoteAsset);

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
 * /transaction/newOrderTrade/:
 *   post:
 *     summary: Create new order trade
 *     description: Create new order trade.
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
 *               - userId
 *               - exchangeId
 *               - symbol
 *               - side
 *               - amount
 *             properties:
 *               userId:
 *                 type: string
 *               exchangeId:
 *                 type: string
 *               symbol:
 *                 type: string
 *               side:
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
 * /transaction/quoteSwapRequest/:
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
 *               - pair
 *               - exchangeId
 *               - amount
 *             properties:
 *               pair:
 *                 type: string
 *               exchangeId:
 *                 type: string
 *               amount:
 *                 type: number
 *             example:
 *               pair: BTC/USDT
 *               exchangeId: asasasas
 *               amount: 1222.32
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

