const express = require('express');
const exchangeController = require('../../controllers/exchange.controller');

const router = express.Router();

router.route('/priceByPairAllExchanges').get(exchangeController.getpriceByPairAllExchanges);
router.route('/getMontoMinByExchange').get(exchangeController.getMontoMinByExchange);
router.route('/').get(exchangeController.getExchanges);
router.route('/:id').get(exchangeController.getExchangeById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Exchange
 *   description: Exchange
 */

/**
 * @swagger
 * /exchange/:
 *   get:
 *     summary: Get all exchanges
 *     description: Get all exchanges.
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
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
 * /exchange/{id}:
 *   get:
 *     summary: Get exchange
 *     description: Get exchange.
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exchange id
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
 * /exchange/priceByPairAllExchanges:
 *   get:
 *     summary: Get price by asset
 *     description: Get price by asset in all exchanges.
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pair
 *         required: true
 *         schema:
 *           type: string
 *         description:
 *           Pair assets: BTC/USDT
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
 * /exchange/getMontoMinByExchange:
 *   get:
 *     summary: Get monto min by Exhcnage
 *     description: Get monto min by Exhcnage.
 *     tags: [Exchange]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pair
 *         required: true
 *         description:
 *           Pair: BTC/USDT
 *       - in: query
 *         name: exchangeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Exchange id
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
