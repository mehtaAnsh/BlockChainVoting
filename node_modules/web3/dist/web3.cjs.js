'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _get = _interopDefault(require('@babel/runtime/helpers/get'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _set = _interopDefault(require('@babel/runtime/helpers/set'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var web3Core = require('web3-core');
var web3Providers = require('web3-providers');
var Utils = require('web3-utils');
var web3Eth = require('web3-eth');
var web3Shh = require('web3-shh');
var web3Bzz = require('web3-bzz');
var web3Net = require('web3-net');
var web3EthPersonal = require('web3-eth-personal');

var version = "1.0.0-beta.52";

var Web3 =
function (_AbstractWeb3Module) {
  _inherits(Web3, _AbstractWeb3Module);
  function Web3(provider, net) {
    var _this;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, Web3);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Web3).call(this, provider, options, null, net));
    _this.eth = new web3Eth.Eth(_this.currentProvider, net, options);
    _this.shh = new web3Shh.Shh(_this.currentProvider, net, options);
    _this.bzz = new web3Bzz.Bzz(_this.currentProvider);
    _this.utils = Utils;
    _this.version = version;
    return _this;
  }
  _createClass(Web3, [{
    key: "setProvider",
    value: function setProvider(provider, net) {
      return _get(_getPrototypeOf(Web3.prototype), "setProvider", this).call(this, provider, net) && this.eth.setProvider(provider, net) && this.shh.setProvider(provider, net) && this.bzz.setProvider(provider);
    }
  }, {
    key: "defaultGasPrice",
    set: function set(value) {
      _set(_getPrototypeOf(Web3.prototype), "defaultGasPrice", value, this, true);
      this.eth.defaultGasPrice = value;
      this.shh.defaultGasPrice = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Web3.prototype), "defaultGasPrice", this);
    }
  }, {
    key: "defaultGas",
    set: function set(value) {
      _set(_getPrototypeOf(Web3.prototype), "defaultGas", value, this, true);
      this.eth.defaultGas = value;
      this.shh.defaultGas = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Web3.prototype), "defaultGas", this);
    }
  }, {
    key: "transactionBlockTimeout",
    set: function set(value) {
      _set(_getPrototypeOf(Web3.prototype), "transactionBlockTimeout", value, this, true);
      this.eth.transactionBlockTimeout = value;
      this.shh.transactionBlockTimeout = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Web3.prototype), "transactionBlockTimeout", this);
    }
  }, {
    key: "transactionConfirmationBlocks",
    set: function set(value) {
      _set(_getPrototypeOf(Web3.prototype), "transactionConfirmationBlocks", value, this, true);
      this.eth.transactionConfirmationBlocks = value;
      this.shh.transactionConfirmationBlocks = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Web3.prototype), "transactionConfirmationBlocks", this);
    }
  }, {
    key: "transactionPollingTimeout",
    set: function set(value) {
      _set(_getPrototypeOf(Web3.prototype), "transactionPollingTimeout", value, this, true);
      this.eth.transactionPollingTimeout = value;
      this.shh.transactionPollingTimeout = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Web3.prototype), "transactionPollingTimeout", this);
    }
  }, {
    key: "defaultAccount",
    set: function set(value) {
      _set(_getPrototypeOf(Web3.prototype), "defaultAccount", value, this, true);
      this.eth.defaultAccount = value;
      this.shh.defaultAccount = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Web3.prototype), "defaultAccount", this);
    }
  }, {
    key: "defaultBlock",
    set: function set(value) {
      _set(_getPrototypeOf(Web3.prototype), "defaultBlock", value, this, true);
      this.eth.defaultBlock = value;
      this.shh.defaultBlock = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Web3.prototype), "defaultBlock", this);
    }
  }], [{
    key: "givenProvider",
    get: function get() {
      return web3Providers.ProviderDetector.detect();
    }
  }, {
    key: "modules",
    get: function get() {
      var providerResolver = new web3Providers.ProvidersModuleFactory().createProviderResolver();
      return {
        Eth: function Eth(provider, options, net) {
          return new web3Eth.Eth(providerResolver.resolve(provider, net), options);
        },
        Net: function Net(provider, options, net) {
          return new web3Net.Network(providerResolver.resolve(provider, net), options);
        },
        Personal: function Personal(provider, options, net) {
          return new web3EthPersonal.Personal(providerResolver.resolve(provider, net), options);
        },
        Shh: function Shh(provider, options, net) {
          return new web3Shh.Shh(providerResolver.resolve(provider, net), options);
        },
        Bzz: function Bzz(provider) {
          return new web3Bzz.Bzz(provider);
        }
      };
    }
  }]);
  return Web3;
}(web3Core.AbstractWeb3Module);

module.exports = Web3;
