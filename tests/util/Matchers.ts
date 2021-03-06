const BigNumber = require('bignumber.js');
const { bn, mantissa } = require('./Helpers');
let assert = require('assert');

const msg = (expected, actual) => {
  return `Expected: ${JSON.stringify(expected.toString())}, \n Actual: ${JSON.stringify(actual.toString())}}`;
}

expect.extend({
  toEqNum(expected, actual) {
    return {
      pass: bn(actual).eq(bn(expected)),
      message: () => msg(expected, actual),
    };
  },

  toRevert(trx, msg = 'revert') {
    return {
      pass: !!trx.message && trx.message === `VM Exception while processing transaction: revert ${msg}`,
      message: () => {
        if (trx.message) {
          return `expected VM Exception while processing transaction: ${msg}, got ${trx.message}`
        } else {
          return `expected revert, but transaction succeeded: ${JSON.stringify(trx)}`
        }
      }
    }
  },

  toAlmostEqual(expected, actual, precision=8) {
    const bnActual = new BigNumber(actual.toString()).toPrecision(precision);
    const bnExpected = new BigNumber(expected.toString()).toPrecision(
      precision
    );
    return {
      pass: bnActual === bnExpected,
      message: () => msg(bnExpected, bnActual),
    };
  },
});
