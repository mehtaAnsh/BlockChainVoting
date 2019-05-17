'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var web3Net = require('web3-net');
var Utils = require('web3-utils');
var web3CoreHelpers = require('web3-core-helpers');
var web3Providers = require('web3-providers');
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var web3CoreMethod = require('web3-core-method');
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _set = _interopDefault(require('@babel/runtime/helpers/set'));
var _get = _interopDefault(require('@babel/runtime/helpers/get'));
var web3Core = require('web3-core');

var MethodFactory =
function (_AbstractMethodFactor) {
  _inherits(MethodFactory, _AbstractMethodFactor);
  function MethodFactory(utils, formatters) {
    var _this;
    _classCallCheck(this, MethodFactory);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(MethodFactory).call(this, utils, formatters));
    _this.methods = {
      getAccounts: web3CoreMethod.GetAccountsMethod,
      newAccount: web3CoreMethod.NewAccountMethod,
      unlockAccount: web3CoreMethod.UnlockAccountMethod,
      lockAccount: web3CoreMethod.LockAccountMethod,
      importRawKey: web3CoreMethod.ImportRawKeyMethod,
      sendTransaction: web3CoreMethod.PersonalSendTransactionMethod,
      signTransaction: web3CoreMethod.PersonalSignTransactionMethod,
      sign: web3CoreMethod.PersonalSignMethod,
      ecRecover: web3CoreMethod.EcRecoverMethod
    };
    return _this;
  }
  return MethodFactory;
}(web3CoreMethod.AbstractMethodFactory);

var Personal =
function (_AbstractWeb3Module) {
  _inherits(Personal, _AbstractWeb3Module);
  function Personal(provider, methodFactory, net, utils, formatters, options, nodeNet) {
    var _this;
    _classCallCheck(this, Personal);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Personal).call(this, provider, options, methodFactory, nodeNet));
    _this.utils = utils;
    _this.formatters = formatters;
    _this.net = net;
    return _this;
  }
  _createClass(Personal, [{
    key: "setProvider",
    value: function setProvider(provider, net) {
      return !!(_get(_getPrototypeOf(Personal.prototype), "setProvider", this).call(this, provider, net) && this.net.setProvider(provider, net));
    }
  }, {
    key: "defaultGasPrice",
    set: function set(value) {
      _set(_getPrototypeOf(Personal.prototype), "defaultGasPrice", value, this, true);
      this.net.defaultGasPrice = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Personal.prototype), "defaultGasPrice", this);
    }
  }, {
    key: "defaultGas",
    set: function set(value) {
      _set(_getPrototypeOf(Personal.prototype), "defaultGas", value, this, true);
      this.net.defaultGas = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Personal.prototype), "defaultGas", this);
    }
  }, {
    key: "transactionBlockTimeout",
    set: function set(value) {
      _set(_getPrototypeOf(Personal.prototype), "transactionBlockTimeout", value, this, true);
      this.net.transactionBlockTimeout = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Personal.prototype), "transactionBlockTimeout", this);
    }
  }, {
    key: "transactionConfirmationBlocks",
    set: function set(value) {
      _set(_getPrototypeOf(Personal.prototype), "transactionConfirmationBlocks", value, this, true);
      this.net.transactionConfirmationBlocks = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Personal.prototype), "transactionConfirmationBlocks", this);
    }
  }, {
    key: "transactionPollingTimeout",
    set: function set(value) {
      _set(_getPrototypeOf(Personal.prototype), "transactionPollingTimeout", value, this, true);
      this.net.transactionPollingTimeout = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Personal.prototype), "transactionPollingTimeout", this);
    }
  }, {
    key: "defaultAccount",
    set: function set(value) {
      _set(_getPrototypeOf(Personal.prototype), "defaultAccount", value, this, true);
      this.net.defaultAccount = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Personal.prototype), "defaultAccount", this);
    }
  }, {
    key: "defaultBlock",
    set: function set(value) {
      _set(_getPrototypeOf(Personal.prototype), "defaultBlock", value, this, true);
      this.net.defaultBlock = value;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Personal.prototype), "defaultBlock", this);
    }
  }]);
  return Personal;
}(web3Core.AbstractWeb3Module);

function Personal$1(provider) {
  var net = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var resolvedProvider = new web3Providers.ProviderResolver().resolve(provider, net);
  return new Personal(resolvedProvider, new MethodFactory(Utils, web3CoreHelpers.formatters), new web3Net.Network(resolvedProvider, null, options), Utils, web3CoreHelpers.formatters, options, null);
}

exports.Personal = Personal$1;
