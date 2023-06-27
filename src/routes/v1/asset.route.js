const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const assetValidation = require('../../validations/asset.validation');
const assetController = require('../../controllers/asset.controller');

const router = express.Router();

router
  .route('/')
  .get(assetController.getAssets);


module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Asset
 *   description: Crypto Assets
 */

/**
 * @swagger
 * /asset/:
 *   get:
 *     summary: Get all crypto assets
 *     description: Get all crypto assets.
 *     tags: [Asset]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Asset'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
