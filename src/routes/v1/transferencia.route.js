const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const transferenciaValidation = require('../../validations/transferencia.validation');
const transferenciaController = require('../../controllers/transferencia.controller');

const router = express.Router();

router
  .route('/postTransferToSubAccount')
  .post(validate(transferenciaValidation.postTransferToSubAccount), transferenciaController.postTransferToSubAccount);

router
  .route('/postTransferToAccount')
  .post(validate(transferenciaValidation.postTransferToAccount), transferenciaController.postTransferToAccount);


module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Transferencia
 *   description: Transferencia between accounts and subaccounts
 */

/**
 * @swagger
 * /transferencia/postTransferToSubAccount/:
 *   post:
 *     summary: Transferencia to sub account
 *     description: Transferencia to sub account.
 *     tags: [Transferencia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - exchangeId
 *               - toEmail
 *               - asset
 *               - amount
 *             properties:
 *               exchangeId:
 *                 type: string
 *               toEmail:
 *                 type: string
 *               asset:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transferencia'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /transferencia/postTransferToAccount/:
 *   post:
 *     summary: Transferencia to account
 *     description: Transferencia to account.
 *     tags: [Transferencia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - exchangeId
 *               - asset
 *               - amount
 *             properties:
 *               exchangeId:
 *                 type: string
 *               asset:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Transferencia'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

