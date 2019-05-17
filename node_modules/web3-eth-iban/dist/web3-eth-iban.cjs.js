'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var Utils = require('web3-utils');
var BigNumber = _interopDefault(require('bn.js'));

var leftPad = function leftPad(string, bytes) {
  var result = string;
  while (result.length < bytes * 2) {
    result = "0".concat(result);
  }
  return result;
};
var iso13616Prepare = function iso13616Prepare(iban) {
  var A = 'A'.charCodeAt(0);
  var Z = 'Z'.charCodeAt(0);
  iban = iban.toUpperCase();
  iban = iban.substr(4) + iban.substr(0, 4);
  return iban.split('').map(function (n) {
    var code = n.charCodeAt(0);
    if (code >= A && code <= Z) {
      return code - A + 10;
    } else {
      return n;
    }
  }).join('');
};
var module9710 = function module9710(iban) {
  var remainder = iban;
  var block;
  while (remainder.length > 2) {
    block = remainder.slice(0, 9);
    remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
  }
  return parseInt(remainder, 10) % 97;
};
var Iban =
function () {
  function Iban(iban) {
    _classCallCheck(this, Iban);
    this._iban = iban;
  }
  _createClass(Iban, [{
    key: "isValid",
    value: function isValid() {
      return /^XE\d{2}(ETH[0-9A-Z]{13}|[0-9A-Z]{30,31})$/.test(this._iban) && module9710(iso13616Prepare(this._iban)) === 1;
    }
  }, {
    key: "isDirect",
    value: function isDirect() {
      return this._iban.length === 34 || this._iban.length === 35;
    }
  }, {
    key: "isIndirect",
    value: function isIndirect() {
      return this._iban.length === 20;
    }
  }, {
    key: "checksum",
    value: function checksum() {
      return this._iban.substr(2, 2);
    }
  }, {
    key: "institution",
    value: function institution() {
      return this.isIndirect() ? this._iban.substr(7, 4) : '';
    }
  }, {
    key: "client",
    value: function client() {
      return this.isIndirect() ? this._iban.substr(11) : '';
    }
  }, {
    key: "toAddress",
    value: function toAddress() {
      if (this.isDirect()) {
        var base36 = this._iban.substr(4);
        var asBn = new BigNumber(base36, 36);
        return Utils.toChecksumAddress(asBn.toString(16, 20));
      }
      return '';
    }
  }, {
    key: "toString",
    value: function toString() {
      return this._iban;
    }
  }], [{
    key: "toAddress",
    value: function toAddress(iban) {
      iban = new Iban(iban);
      if (!iban.isDirect()) {
        throw new Error("IBAN is indirect and can't be converted");
      }
      return iban.toAddress();
    }
  }, {
    key: "toIban",
    value: function toIban(address) {
      return Iban.fromAddress(address).toString();
    }
  }, {
    key: "fromAddress",
    value: function fromAddress(address) {
      if (!Utils.isAddress(address)) {
        throw new Error("Provided address is not a valid address: ".concat(address));
      }
      address = address.replace('0x', '').replace('0X', '');
      var asBn = new BigNumber(address, 16);
      var base36 = asBn.toString(36);
      var padded = leftPad(base36, 15);
      return Iban.fromBban(padded.toUpperCase());
    }
  }, {
    key: "fromBban",
    value: function fromBban(bban) {
      var countryCode = 'XE';
      var remainder = module9710(iso13616Prepare("".concat(countryCode, "00").concat(bban)));
      var checkDigit = "0".concat(98 - remainder).slice(-2);
      return new Iban(countryCode + checkDigit + bban);
    }
  }, {
    key: "createIndirect",
    value: function createIndirect(options) {
      return Iban.fromBban("ETH".concat(options.institution).concat(options.identifier));
    }
  }, {
    key: "isValid",
    value: function isValid(iban) {
      var i = new Iban(iban);
      return i.isValid();
    }
  }]);
  return Iban;
}();

exports.Iban = Iban;
