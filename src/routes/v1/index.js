const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const assetRoute = require('./asset.route');
const exchangeRoute = require('./exchange.route');
const subAccountRoute = require('./subAccount.route');
const transactionRoute = require('./transaction.route');

const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/asset',
    route: assetRoute,
  },
  {
    path: '/exchange',
    route: exchangeRoute,
  },
  {
    path: '/subAccount',
    route: subAccountRoute,
  },
  {
    path: '/transaction',
    route: transactionRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
