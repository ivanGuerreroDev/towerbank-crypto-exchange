const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const extWalletValidation = require('../../validations/extWallet.validation');
const extWalletController = require('../../controllers/extWallet.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ExtWallet
 *   description: Billeteras Externas
 */

/**
 * @swagger
 * /extWallet/create:
 *   post:
 *     summary: Create External Wallet
 *     description: Create External Wallet.
 *     tags: [ExtWallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *               - symbol
 *               - name
 *               - walletType
 *             properties:
 *               address:
 *                 type: string
 *               symbol:
 *                 type: string
 *               name:
 *                 type: string
 *               walletType:
 *                 type: string
 *
 *             example:
 *               address: asdasd
 *               symbol: BTC
 *               name: Metamask
 *               walletType: Metamask
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

router
  .route('/create')
  .post(extWalletController.createExtWallet);


/**
 * @swagger
 * /extWallet/delete:
 *   delete:
 *     summary: Delete External Wallet
 *     description: Delete External Wallet.
 *     tags: [ExtWallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - extWallet
 *             properties:
 *               extWallet:
 *                 type: string
 *
 *             example:
 *               extWallet: asdasd
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

router
  .route('/delete')
  .delete(extWalletController.deleteExtWallet);


/**
 * @swagger
 * /extWallet:
 *   get:
 *     summary: Get all external wallets wallets
 *     description: Get all external wallets.
 *     tags: [ExtWallet]
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
router
  .route('/')
  .get(extWalletController.getExtWallets);





module.exports = router;




