(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@babel/runtime/helpers/classCallCheck'), require('@babel/runtime/helpers/createClass'), require('@babel/runtime/helpers/possibleConstructorReturn'), require('@babel/runtime/helpers/get'), require('@babel/runtime/helpers/getPrototypeOf'), require('@babel/runtime/helpers/set'), require('@babel/runtime/helpers/inherits'), require('web3-core'), require('web3-providers'), require('web3-utils'), require('web3-eth'), require('web3-shh'), require('web3-bzz'), require('web3-net'), require('web3-eth-personal')) :
    typeof define === 'function' && define.amd ? define(['@babel/runtime/helpers/classCallCheck', '@babel/runtime/helpers/createClass', '@babel/runtime/helpers/possibleConstructorReturn', '@babel/runtime/helpers/get', '@babel/runtime/helpers/getPrototypeOf', '@babel/runtime/helpers/set', '@babel/runtime/helpers/inherits', 'web3-core', 'web3-providers', 'web3-utils', 'web3-eth', 'web3-shh', 'web3-bzz', 'web3-net', 'web3-eth-personal'], factory) :
    (global = global || self, global.Web3 = factory(global._classCallCheck, global._createClass, global._possibleConstructorReturn, global._get, global._getPrototypeOf, global._set, global._inherits, global['web3-core'], global['web3-providers'], global['web3-utils'], global['web3-eth'], global['web3-shh'], global['web3-bzz'], global['web3-net'], global['web3-eth-personal']));
}(this, function (_classCallCheck, _createClass, _possibleConstructorReturn, _get, _getPrototypeOf, _set, _inherits, web3Core, web3Providers, Utils, web3Eth, web3Shh, web3Bzz, web3Net, web3EthPersonal) { 'use strict';

    _classCallCheck = _classCallCheck && _classCallCheck.hasOwnProperty('default') ? _classCallCheck['default'] : _classCallCheck;
    _createClass = _createClass && _createClass.hasOwnProperty('default') ? _createClass['default'] : _createClass;
    _possibleConstructorReturn = _possibleConstructorReturn && _possibleConstructorReturn.hasOwnProperty('default') ? _possibleConstructorReturn['default'] : _possibleConstructorReturn;
    _get = _get && _get.hasOwnProperty('default') ? _get['default'] : _get;
    _getPrototypeOf = _getPrototypeOf && _getPrototypeOf.hasOwnProperty('default') ? _getPrototypeOf['default'] : _getPrototypeOf;
    _set = _set && _set.hasOwnProperty('default') ? _set['default'] : _set;
    _inherits = _inherits && _inherits.hasOwnProperty('default') ? _inherits['default'] : _inherits;

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

    return Web3;

}));
