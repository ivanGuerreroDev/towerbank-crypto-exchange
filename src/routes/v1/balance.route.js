const express = require('express');
const balanceController = require('../../controllers/balance.controller');

const router = express.Router();

router.route('/getExchangeBalancesByCrypto').get(balanceController.getExchangeBalancesByCrypto);
router.route('/getFiatBalance').get(balanceController.getFiatBalance);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Balance
 *   description: Balance
 */

/**
 * @swagger
 * /balance/getExchangeBalancesByCrypto:
 *   get:
 *     summary: Get balance by crypto
 *     description: Get balance by crypto.
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: coin
 *         required: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Balance'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /balance/getFiatBalance:
 *   get:
 *     summary: Get balance by Account
 *     description: Get balance by Account.
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: accountId
 *         required: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Balance'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
