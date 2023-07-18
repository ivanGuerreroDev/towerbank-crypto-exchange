const express = require('express');
const balanceController = require('../../controllers/balance.controller');

const router = express.Router();

router.route('/getBalancesByCrypto/').get(balanceController.getBalancesByCrypto);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Balance
 *   description: Balance
 */

/**
 * @swagger
 * /balance/getBalancesByCrypto:
 *   get:
 *     summary: Get balance by crypto
 *     description: Get balance by crypto.
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
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
