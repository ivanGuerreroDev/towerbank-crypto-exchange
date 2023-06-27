const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Towerbank Crypto Exchange',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/ivanGuerreroDev/towerbank-crypto-exchange/blob/main/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
