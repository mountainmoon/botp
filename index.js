'use strict';

var crypto = require('crypto');
var lib = require('./lib')

/**
 * convert a hex value to a byte array
 * @param {String} hex string of hex to convert to a byte array
 * @return {Array} bytes
 */
function hexToBytes(hex) {
  var bytes = [];
  for (var c = 0, C = hex.length; c < C; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
}

function getHmac(key, counterBytes) {
  // Create the byte array
  var b = new Buffer(counterBytes);

  var hmac = crypto.createHmac('sha1', key);

  // Update the HMAC with the byte array
  var digest = hmac.update(b).digest('hex');

  // Get byte array
  return hexToBytes(digest);
};

var _gen = lib.hotp.gen
lib.hotp.gen = function (key, opt) {
  return _gen(key, opt, getHmac)
}

module.exports.hotp = lib.hotp;
module.exports.totp = lib.totp;
