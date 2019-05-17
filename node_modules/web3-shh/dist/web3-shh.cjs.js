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
var web3CoreSubscriptions = require('web3-core-subscriptions');
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
      getVersion: web3CoreMethod.ShhVersionMethod,
      getInfo: web3CoreMethod.GetInfoMethod,
      setMaxMessageSize: web3CoreMethod.SetMaxMessageSizeMethod,
      setMinPoW: web3CoreMethod.SetMinPoWMethod,
      markTrustedPeer: web3CoreMethod.MarkTrustedPeerMethod,
      newKeyPair: web3CoreMethod.NewKeyPairMethod,
      addPrivateKey: web3CoreMethod.AddPrivateKeyMethod,
      deleteKeyPair: web3CoreMethod.DeleteKeyPairMethod,
      hasKeyPair: web3CoreMethod.HasKeyPairMethod,
      getPublicKey: web3CoreMethod.GetPublicKeyMethod,
      getPrivateKey: web3CoreMethod.GetPrivateKeyMethod,
      newSymKey: web3CoreMethod.NewSymKeyMethod,
      addSymKey: web3CoreMethod.AddSymKeyMethod,
      generateSymKeyFromPassword: web3CoreMethod.GenerateSymKeyFromPasswordMethod,
      hasSymKey: web3CoreMethod.HasSymKeyMethod,
      getSymKey: web3CoreMethod.GetSymKeyMethod,
      deleteSymKey: web3CoreMethod.DeleteSymKeyMethod,
      newMessageFilter: web3CoreMethod.NewMessageFilterMethod,
      getFilterMessages: web3CoreMethod.GetFilterMessagesMethod,
      deleteMessageFilter: web3CoreMethod.DeleteMessageFilterMethod,
      post: web3CoreMethod.PostMethod
    };
    return _this;
  }
  return MethodFactory;
}(web3CoreMethod.AbstractMethodFactory);

var SubscriptionsFactory =
function () {
  function SubscriptionsFactory(utils, formatters) {
    _classCallCheck(this, SubscriptionsFactory);
    this.utils = utils;
    this.formatters = formatters;
  }
  _createClass(SubscriptionsFactory, [{
    key: "getSubscription",
    value: function getSubscription(moduleInstance, type, options) {
      switch (type) {
        case 'messages':
          return new web3CoreSubscriptions.MessagesSubscription(options, this.utils, this.formatters, moduleInstance);
        default:
          throw new Error("Unknown subscription: ".concat(type));
      }
    }
  }]);
  return SubscriptionsFactory;
}();

var Shh =
function (_AbstractWeb3Module) {
  _inherits(Shh, _AbstractWeb3Module);
  function Shh(provider, methodFactory, subscriptionsFactory, net, options, nodeNet) {
    var _this;
    _classCallCheck(this, Shh);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Shh).call(this, provider, options, methodFactory, nodeNet));
    _this.subscriptionsFactory = subscriptionsFactory;
    _this.net = net;
    return _this;
  }
  _createClass(Shh, [{
    key: "subscribe",
    value: function subscribe(type, options, callback) {
      return this.subscriptionsFactory.getSubscription(this, type, options).subscribe(callback);
    }
  }, {
    key: "clearSubscriptions",
    value: function clearSubscriptions() {
      return _get(_getPrototypeOf(Shh.prototype), "clearSubscriptions", this).call(this, 'shh_unsubscribe');
    }
  }, {
    key: "setProvider",
    value: function setProvider(provider, net) {
      return this.net.setProvider(provider, net) && _get(_getPrototypeOf(Shh.prototype), "setProvider", this).call(this, provider, net);
    }
  }, {
    key: "defaultGasPrice",
    set: function set(value) {
      _set(_getPrototypeOf(Shh.prototype), "defaultGasPrice", value, this, true);
      this.net.defaultGasPrice = this.defaultGasPrice;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Shh.prototype), "defaultGasPrice", this);
    }
  }, {
    key: "defaultGas",
    set: function set(value) {
      _set(_getPrototypeOf(Shh.prototype), "defaultGas", value, this, true);
      this.net.defaultGas = this.defaultGas;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Shh.prototype), "defaultGas", this);
    }
  }, {
    key: "transactionBlockTimeout",
    set: function set(value) {
      _set(_getPrototypeOf(Shh.prototype), "transactionBlockTimeout", value, this, true);
      this.net.transactionBlockTimeout = this.transactionBlockTimeout;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Shh.prototype), "transactionBlockTimeout", this);
    }
  }, {
    key: "transactionConfirmationBlocks",
    set: function set(value) {
      _set(_getPrototypeOf(Shh.prototype), "transactionConfirmationBlocks", value, this, true);
      this.net.transactionConfirmationBlocks = this.transactionConfirmationBlocks;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Shh.prototype), "transactionConfirmationBlocks", this);
    }
  }, {
    key: "transactionPollingTimeout",
    set: function set(value) {
      _set(_getPrototypeOf(Shh.prototype), "transactionPollingTimeout", value, this, true);
      this.net.transactionPollingTimeout = this.transactionPollingTimeout;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Shh.prototype), "transactionPollingTimeout", this);
    }
  }, {
    key: "defaultAccount",
    set: function set(value) {
      _set(_getPrototypeOf(Shh.prototype), "defaultAccount", value, this, true);
      this.net.defaultAccount = this.defaultAccount;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Shh.prototype), "defaultAccount", this);
    }
  }, {
    key: "defaultBlock",
    set: function set(value) {
      _set(_getPrototypeOf(Shh.prototype), "defaultBlock", value, this, true);
      this.net.defaultBlock = this.defaultBlock;
    }
    ,
    get: function get() {
      return _get(_getPrototypeOf(Shh.prototype), "defaultBlock", this);
    }
  }]);
  return Shh;
}(web3Core.AbstractWeb3Module);

function Shh$1(provider) {
  var net = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var resolvedProvider = new web3Providers.ProviderResolver().resolve(provider, net);
  return new Shh(resolvedProvider, new MethodFactory(Utils, web3CoreHelpers.formatters), new SubscriptionsFactory(Utils, web3CoreHelpers.formatters), new web3Net.Network(resolvedProvider, null, options), options, null);
}

exports.Shh = Shh$1;
