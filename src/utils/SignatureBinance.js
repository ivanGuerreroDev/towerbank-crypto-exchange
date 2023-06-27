const base64 = require('base64-js');
const crypto = require('crypto');
const path = require('path');

const SignatureAndTimestampBinance = (params) => {
  const PRIVATE_KEY_PATH = path.join(__dirname, '..', 'certs', 'test-prv-key.pem');
  const fs = require('fs');
  const privateKeyPem = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
  const privateKey = crypto.createPrivateKey(privateKeyPem);

  // Timestamp the request
  const timestamp = Date.now();

  // Sign the request
  const payload = Object.entries(params)
    .map(([param, value]) => `${param}=${value}`)
    .join('&');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(payload, 'ascii');
  const signature = base64.fromByteArray(sign.sign(privateKey, 'base64'));
  return ({ signature, timestamp })
}



module.exports.SignatureAndTimestampBinance = SignatureAndTimestampBinance
