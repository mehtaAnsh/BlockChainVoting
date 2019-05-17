'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var web3CoreHelpers = require('web3-core-helpers');
var Utils = require('web3-utils');
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var web3CoreMethod = require('web3-core-method');
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var web3Core = require('web3-core');
var isFunction = _interopDefault(require('lodash/isFunction'));

var MethodFactory =
function (_AbstractMethodFactor) {
  _inherits(MethodFactory, _AbstractMethodFactor);
  function MethodFactory(utils, formatters) {
    var _this;
    _classCallCheck(this, MethodFactory);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(MethodFactory).call(this, utils, formatters));
    _this.methods = {
      getId: web3CoreMethod.VersionMethod,
      getBlockByNumber: web3CoreMethod.GetBlockByNumberMethod,
      isListening: web3CoreMethod.ListeningMethod,
      getPeerCount: web3CoreMethod.PeerCountMethod
    };
    return _this;
  }
  return MethodFactory;
}(web3CoreMethod.AbstractMethodFactory);

var Network =
function (_AbstractWeb3Module) {
  _inherits(Network, _AbstractWeb3Module);
  function Network(provider, methodFactory, utils, formatters, options, nodeNet) {
    var _this;
    _classCallCheck(this, Network);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Network).call(this, provider, options, methodFactory, nodeNet));
    _this.utils = utils;
    _this.formatters = formatters;
    return _this;
  }
  _createClass(Network, [{
    key: "getNetworkType",
    value: function () {
      var _getNetworkType = _asyncToGenerator(
      _regeneratorRuntime.mark(function _callee(callback) {
        var id, networkType;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.getId();
              case 3:
                id = _context.sent;
                networkType = 'private';
                _context.t0 = id;
                _context.next = _context.t0 === 1 ? 8 : _context.t0 === 2 ? 10 : _context.t0 === 3 ? 12 : _context.t0 === 4 ? 14 : _context.t0 === 42 ? 16 : 18;
                break;
              case 8:
                networkType = 'main';
                return _context.abrupt("break", 18);
              case 10:
                networkType = 'morden';
                return _context.abrupt("break", 18);
              case 12:
                networkType = 'ropsten';
                return _context.abrupt("break", 18);
              case 14:
                networkType = 'rinkeby';
                return _context.abrupt("break", 18);
              case 16:
                networkType = 'kovan';
                return _context.abrupt("break", 18);
              case 18:
                if (isFunction(callback)) {
                  callback(null, networkType);
                }
                return _context.abrupt("return", networkType);
              case 22:
                _context.prev = 22;
                _context.t1 = _context["catch"](0);
                if (isFunction(callback)) {
                  callback(_context.t1, null);
                }
                throw _context.t1;
              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 22]]);
      }));
      function getNetworkType(_x) {
        return _getNetworkType.apply(this, arguments);
      }
      return getNetworkType;
    }()
  }]);
  return Network;
}(web3Core.AbstractWeb3Module);

function Network$1(provider) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Network(provider, new MethodFactory(Utils, web3CoreHelpers.formatters), Utils, web3CoreHelpers.formatters, options, null);
}

exports.Network = Network$1;
