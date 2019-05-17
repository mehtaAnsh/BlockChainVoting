'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Utils = require('web3-utils');
var web3CoreHelpers = require('web3-core-helpers');
var web3Providers = require('web3-providers');
var web3EthContract = require('web3-eth-contract');
var web3EthAbi = require('web3-eth-abi');
var web3Net = require('web3-net');
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _get = _interopDefault(require('@babel/runtime/helpers/get'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var web3CoreMethod = require('web3-core-method');
var web3Core = require('web3-core');
var isFunction = _interopDefault(require('lodash/isFunction'));
var namehash = _interopDefault(require('eth-ens-namehash'));

var Ens =
function (_AbstractWeb3Module) {
  _inherits(Ens, _AbstractWeb3Module);
  function Ens(provider, options, ensModuleFactory, contractModuleFactory, accounts, abiCoder, utils, formatters, net, nodeNet) {
    var _this;
    _classCallCheck(this, Ens);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Ens).call(this, provider, options, null, nodeNet));
    _this.accounts = accounts;
    _this.ensModuleFactory = ensModuleFactory;
    _this.contractModuleFactory = contractModuleFactory;
    _this.abiCoder = abiCoder;
    _this.utils = utils;
    _this.formatters = formatters;
    _this.registryOptions = options;
    _this.net = net;
    _this.transactionSigner = options.transactionSigner;
    _this._registry = false;
    return _this;
  }
  _createClass(Ens, [{
    key: "setProvider",
    value: function setProvider(provider, net) {
      return _get(_getPrototypeOf(Ens.prototype), "setProvider", this).call(this, provider, net) && this.registry.setProvider(provider, net);
    }
  }, {
    key: "resolver",
    value: function resolver(name) {
      return this.registry.resolver(name);
    }
  }, {
    key: "supportsInterface",
    value: function () {
      var _supportsInterface = _asyncToGenerator(
      _regeneratorRuntime.mark(function _callee(name, interfaceId, callback) {
        var resolver;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.registry.resolver(name);
              case 2:
                resolver = _context.sent;
                return _context.abrupt("return", resolver.methods.supportsInterface(interfaceId).call(callback));
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function supportsInterface(_x, _x2, _x3) {
        return _supportsInterface.apply(this, arguments);
      }
      return supportsInterface;
    }()
  }, {
    key: "getAddress",
    value: function () {
      var _getAddress = _asyncToGenerator(
      _regeneratorRuntime.mark(function _callee2(name, callback) {
        var resolver;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.registry.resolver(name);
              case 2:
                resolver = _context2.sent;
                return _context2.abrupt("return", resolver.methods.addr(namehash.hash(name)).call(callback));
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function getAddress(_x4, _x5) {
        return _getAddress.apply(this, arguments);
      }
      return getAddress;
    }()
  }, {
    key: "setAddress",
    value: function setAddress(name, address, sendOptions, callback) {
      var promiEvent = new web3CoreMethod.PromiEvent();
      this.registry.resolver(name).then(function (resolver) {
        resolver.methods.setAddr(namehash.hash(name), address).send(sendOptions, callback).on('transactionHash', function (transactionHash) {
          promiEvent.emit('transactionHash', transactionHash);
        }).on('confirmation', function (confirmationNumber, receipt) {
          promiEvent.emit('confirmation', confirmationNumber, receipt);
        }).on('receipt', function (receipt) {
          if (isFunction(callback)) {
            callback(receipt);
          }
          promiEvent.emit('receipt', receipt);
          promiEvent.resolve(receipt);
        }).on('error', function (error) {
          if (isFunction(callback)) {
            callback(error);
          }
          promiEvent.emit('error', error);
          promiEvent.reject(error);
        });
      });
      return promiEvent;
    }
  }, {
    key: "getPubkey",
    value: function () {
      var _getPubkey = _asyncToGenerator(
      _regeneratorRuntime.mark(function _callee3(name, callback) {
        var resolver;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.registry.resolver(name);
              case 2:
                resolver = _context3.sent;
                return _context3.abrupt("return", resolver.methods.pubkey(namehash.hash(name)).call(callback));
              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function getPubkey(_x6, _x7) {
        return _getPubkey.apply(this, arguments);
      }
      return getPubkey;
    }()
  }, {
    key: "setPubkey",
    value: function setPubkey(name, x, y, sendOptions, callback) {
      var promiEvent = new web3CoreMethod.PromiEvent();
      this.registry.resolver(name).then(function (resolver) {
        resolver.methods.setPubkey(namehash.hash(name), x, y).send(sendOptions, callback).on('transactionHash', function (transactionHash) {
          promiEvent.emit('transactionHash', transactionHash);
        }).on('confirmation', function (confirmationNumber, receipt) {
          promiEvent.emit('confirmation', confirmationNumber, receipt);
        }).on('receipt', function (receipt) {
          if (isFunction(callback)) {
            callback(receipt);
          }
          promiEvent.emit('receipt', receipt);
          promiEvent.resolve(receipt);
        }).on('error', function (error) {
          if (isFunction(callback)) {
            callback(error);
          }
          promiEvent.emit('error', error);
          promiEvent.reject(error);
        });
      });
      return promiEvent;
    }
  }, {
    key: "getText",
    value: function () {
      var _getText = _asyncToGenerator(
      _regeneratorRuntime.mark(function _callee4(name, key, callback) {
        var resolver;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.registry.resolver(name);
              case 2:
                resolver = _context4.sent;
                return _context4.abrupt("return", resolver.methods.text(namehash.hash(name), key).call(callback));
              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function getText(_x8, _x9, _x10) {
        return _getText.apply(this, arguments);
      }
      return getText;
    }()
  }, {
    key: "setText",
    value: function setText(name, key, value, sendOptions, callback) {
      var promiEvent = new web3CoreMethod.PromiEvent();
      this.registry.resolver(name).then(function (resolver) {
        resolver.methods.setText(namehash.hash(name), key, value).send(sendOptions, callback).on('transactionHash', function (transactionHash) {
          promiEvent.emit('transactionHash', transactionHash);
        }).on('confirmation', function (confirmationNumber, receipt) {
          promiEvent.emit('confirmation', confirmationNumber, receipt);
        }).on('receipt', function (receipt) {
          if (isFunction(callback)) {
            callback(receipt);
          }
          promiEvent.emit('receipt', receipt);
          promiEvent.resolve(receipt);
        }).on('error', function (error) {
          if (isFunction(callback)) {
            callback(error);
          }
          promiEvent.emit('error', error);
          promiEvent.reject(error);
        });
      });
      return promiEvent;
    }
  }, {
    key: "getContent",
    value: function () {
      var _getContent = _asyncToGenerator(
      _regeneratorRuntime.mark(function _callee5(name, callback) {
        var resolver;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.registry.resolver(name);
              case 2:
                resolver = _context5.sent;
                return _context5.abrupt("return", resolver.methods.content(namehash.hash(name)).call(callback));
              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function getContent(_x11, _x12) {
        return _getContent.apply(this, arguments);
      }
      return getContent;
    }()
  }, {
    key: "setContent",
    value: function setContent(name, hash, sendOptions, callback) {
      var promiEvent = new web3CoreMethod.PromiEvent();
      this.registry.resolver(name).then(function (resolver) {
        resolver.methods.setContent(namehash.hash(name), hash).send(sendOptions, callback).on('transactionHash', function (transactionHash) {
          promiEvent.emit('transactionHash', transactionHash);
        }).on('confirmation', function (confirmationNumber, receipt) {
          promiEvent.emit('confirmation', confirmationNumber, receipt);
        }).on('receipt', function (receipt) {
          if (isFunction(callback)) {
            callback(receipt);
          }
          promiEvent.emit('receipt', receipt);
          promiEvent.resolve(receipt);
        }).on('error', function (error) {
          if (isFunction(callback)) {
            callback(error);
          }
          promiEvent.emit('error', error);
          promiEvent.reject(error);
        });
      });
      return promiEvent;
    }
  }, {
    key: "getMultihash",
    value: function () {
      var _getMultihash = _asyncToGenerator(
      _regeneratorRuntime.mark(function _callee6(name, callback) {
        var resolver;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.registry.resolver(name);
              case 2:
                resolver = _context6.sent;
                return _context6.abrupt("return", resolver.methods.multihash(namehash.hash(name)).call(callback));
              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function getMultihash(_x13, _x14) {
        return _getMultihash.apply(this, arguments);
      }
      return getMultihash;
    }()
  }, {
    key: "setMultihash",
    value: function setMultihash(name, hash, sendOptions, callback) {
      var promiEvent = new web3CoreMethod.PromiEvent();
      this.registry.resolver(name).then(function (resolver) {
        resolver.methods.setMultihash(namehash.hash(name), hash).send(sendOptions, callback).on('transactionHash', function (transactionHash) {
          promiEvent.emit('transactionHash', transactionHash);
        }).on('confirmation', function (confirmationNumber, receipt) {
          promiEvent.emit('confirmation', confirmationNumber, receipt);
        }).on('receipt', function (receipt) {
          if (isFunction(callback)) {
            callback(receipt);
          }
          promiEvent.emit('receipt', receipt);
          promiEvent.resolve(receipt);
        }).on('error', function (error) {
          if (isFunction(callback)) {
            callback(error);
          }
          promiEvent.emit('error', error);
          promiEvent.reject(error);
        });
      });
      return promiEvent;
    }
  }, {
    key: "getContenthash",
    value: function () {
      var _getContenthash = _asyncToGenerator(
      _regeneratorRuntime.mark(function _callee7(name, callback) {
        var resolver;
        return _regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.registry.resolver(name);
              case 2:
                resolver = _context7.sent;
                return _context7.abrupt("return", resolver.methods.contenthash(namehash.hash(name)).call(callback));
              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function getContenthash(_x15, _x16) {
        return _getContenthash.apply(this, arguments);
      }
      return getContenthash;
    }()
  }, {
    key: "setContenthash",
    value: function setContenthash(name, hash, sendOptions, callback) {
      var promiEvent = new web3CoreMethod.PromiEvent();
      this.registry.resolver(name).then(function (resolver) {
        resolver.methods.setContenthash(namehash.hash(name), hash).send(sendOptions, callback).on('transactionHash', function (transactionHash) {
          promiEvent.emit('transactionHash', transactionHash);
        }).on('confirmation', function (confirmationNumber, receipt) {
          promiEvent.emit('confirmation', confirmationNumber, receipt);
        }).on('receipt', function (receipt) {
          if (isFunction(callback)) {
            callback(receipt);
          }
          promiEvent.emit('receipt', receipt);
          promiEvent.resolve(receipt);
        }).on('error', function (error) {
          if (isFunction(callback)) {
            callback(error);
          }
          promiEvent.emit('error', error);
          promiEvent.reject(error);
        });
      });
      return promiEvent;
    }
  }, {
    key: "registry",
    get: function get() {
      if (!this._registry) {
        this._registry = this.ensModuleFactory.createRegistry(this.currentProvider, this.contractModuleFactory, this.accounts, this.abiCoder, this.utils, this.formatters, this.registryOptions, this.net);
      }
      return this._registry;
    }
  }]);
  return Ens;
}(web3Core.AbstractWeb3Module);

var REGISTRY_ABI = [{
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'resolver',
  outputs: [{
    name: '',
    type: 'address'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'owner',
  outputs: [{
    name: '',
    type: 'address'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'label',
    type: 'bytes32'
  }, {
    name: 'owner',
    type: 'address'
  }],
  name: 'setSubnodeOwner',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'ttl',
    type: 'uint64'
  }],
  name: 'setTTL',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'ttl',
  outputs: [{
    name: '',
    type: 'uint64'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'resolver',
    type: 'address'
  }],
  name: 'setResolver',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'owner',
    type: 'address'
  }],
  name: 'setOwner',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'owner',
    type: 'address'
  }],
  name: 'Transfer',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: true,
    name: 'label',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'owner',
    type: 'address'
  }],
  name: 'NewOwner',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'resolver',
    type: 'address'
  }],
  name: 'NewResolver',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'ttl',
    type: 'uint64'
  }],
  name: 'NewTTL',
  type: 'event'
}];

var RESOLVER_ABI = [{
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'key',
    type: 'string'
  }],
  name: 'text',
  outputs: [{
    name: '',
    type: 'string'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'key',
    type: 'string'
  }, {
    name: 'value',
    type: 'string'
  }],
  name: 'setText',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'interfaceID',
    type: 'bytes4'
  }],
  name: 'supportsInterface',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'pure',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'contentTypes',
    type: 'uint256'
  }],
  name: 'ABI',
  outputs: [{
    name: 'contentType',
    type: 'uint256'
  }, {
    name: 'data',
    type: 'bytes'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'hash',
    type: 'bytes'
  }],
  name: 'setMultihash',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'multihash',
  outputs: [{
    name: '',
    type: 'bytes'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'hash',
    type: 'bytes'
  }],
  name: 'setContenthash',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'contenthash',
  outputs: [{
    name: '',
    type: 'bytes'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'x',
    type: 'bytes32'
  }, {
    name: 'y',
    type: 'bytes32'
  }],
  name: 'setPubkey',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'content',
  outputs: [{
    name: 'ret',
    type: 'bytes32'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'addr',
  outputs: [{
    name: 'ret',
    type: 'address'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'contentType',
    type: 'uint256'
  }, {
    name: 'data',
    type: 'bytes'
  }],
  name: 'setABI',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'name',
  outputs: [{
    name: 'ret',
    type: 'string'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'name',
    type: 'string'
  }],
  name: 'setName',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'hash',
    type: 'bytes32'
  }],
  name: 'setContent',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }],
  name: 'pubkey',
  outputs: [{
    name: 'x',
    type: 'bytes32'
  }, {
    name: 'y',
    type: 'bytes32'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: 'node',
    type: 'bytes32'
  }, {
    name: 'addr',
    type: 'address'
  }],
  name: 'setAddr',
  outputs: [],
  payable: false,
  type: 'function'
}, {
  inputs: [{
    name: 'ensAddr',
    type: 'address'
  }],
  payable: false,
  type: 'constructor'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'a',
    type: 'address'
  }],
  name: 'AddrChanged',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'hash',
    type: 'bytes32'
  }],
  name: 'ContentChanged',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'indexedKey',
    type: 'string'
  }, {
    indexed: false,
    name: 'key',
    type: 'string'
  }],
  name: 'TextChanged',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'hash',
    type: 'bytes'
  }],
  name: 'ContenthashChanged',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'name',
    type: 'string'
  }],
  name: 'NameChanged',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: true,
    name: 'contentType',
    type: 'uint256'
  }],
  name: 'ABIChanged',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'node',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'x',
    type: 'bytes32'
  }, {
    indexed: false,
    name: 'y',
    type: 'bytes32'
  }],
  name: 'PubkeyChanged',
  type: 'event'
}];

var Registry =
function (_AbstractContract) {
  _inherits(Registry, _AbstractContract);
  function Registry(provider, contractModuleFactory, accounts, abiCoder, utils, formatters, options, net) {
    var _this;
    _classCallCheck(this, Registry);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Registry).call(this, provider, contractModuleFactory, accounts, abiCoder, utils, formatters, REGISTRY_ABI, '', options));
    _this.net = net;
    _this.resolverContract = null;
    _this.resolverName = null;
    return _this;
  }
  _createClass(Registry, [{
    key: "owner",
    value: function () {
      var _owner = _asyncToGenerator(
      _regeneratorRuntime.mark(function _callee(name, callback) {
        var _owner2;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.address) {
                  _context.next = 4;
                  break;
                }
                _context.next = 3;
                return this.checkNetwork();
              case 3:
                this.address = _context.sent;
              case 4:
                _context.prev = 4;
                _context.next = 7;
                return this.methods.owner(namehash.hash(name)).call();
              case 7:
                _owner2 = _context.sent;
                if (isFunction(callback)) {
                  callback(false, _owner2);
                }
                return _context.abrupt("return", _owner2);
              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](4);
                if (isFunction(callback)) {
                  callback(_context.t0, null);
                }
                throw _context.t0;
              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 12]]);
      }));
      function owner(_x, _x2) {
        return _owner.apply(this, arguments);
      }
      return owner;
    }()
  }, {
    key: "setProvider",
    value: function setProvider(provider, net) {
      if (this.resolverContract) {
        return this.resolverContract.setProvider(provider, net) && _get(_getPrototypeOf(Registry.prototype), "setProvider", this).call(this, provider, net);
      }
      return _get(_getPrototypeOf(Registry.prototype), "setProvider", this).call(this, provider, net);
    }
  }, {
    key: "resolver",
    value: function () {
      var _resolver = _asyncToGenerator(
      _regeneratorRuntime.mark(function _callee2(name) {
        var address, clone;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.resolverName === name && this.resolverContract)) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return", this.resolverContract);
              case 2:
                if (this.address) {
                  _context2.next = 6;
                  break;
                }
                _context2.next = 5;
                return this.checkNetwork();
              case 5:
                this.address = _context2.sent;
              case 6:
                _context2.next = 8;
                return this.methods.resolver(namehash.hash(name)).call();
              case 8:
                address = _context2.sent;
                clone = this.clone();
                clone.jsonInterface = RESOLVER_ABI;
                clone.address = address;
                this.resolverName = name;
                this.resolverContract = clone;
                return _context2.abrupt("return", clone);
              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function resolver(_x3) {
        return _resolver.apply(this, arguments);
      }
      return resolver;
    }()
  }, {
    key: "checkNetwork",
    value: function () {
      var _checkNetwork = _asyncToGenerator(
      _regeneratorRuntime.mark(function _callee3() {
        var ensAddresses, block, headAge, networkType, address;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                ensAddresses = {
                  main: '0x314159265dD8dbb310642f98f50C066173C1259b',
                  ropsten: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
                  rinkeby: '0xe7410170f87102df0055eb195163a03b7f2bff4a'
                };
                _context3.next = 3;
                return this.net.getBlockByNumber('latest', false);
              case 3:
                block = _context3.sent;
                headAge = new Date() / 1000 - block.timestamp;
                if (!(headAge > 3600)) {
                  _context3.next = 7;
                  break;
                }
                throw new Error("Network not synced; last block was ".concat(headAge, " seconds ago"));
              case 7:
                _context3.next = 9;
                return this.net.getNetworkType();
              case 9:
                networkType = _context3.sent;
                address = ensAddresses[networkType];
                if (!(typeof address === 'undefined')) {
                  _context3.next = 13;
                  break;
                }
                throw new TypeError("ENS is not supported on network: \"".concat(networkType, "\""));
              case 13:
                return _context3.abrupt("return", address);
              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function checkNetwork() {
        return _checkNetwork.apply(this, arguments);
      }
      return checkNetwork;
    }()
  }]);
  return Registry;
}(web3EthContract.AbstractContract);

var EnsModuleFactory =
function () {
  function EnsModuleFactory() {
    _classCallCheck(this, EnsModuleFactory);
  }
  _createClass(EnsModuleFactory, [{
    key: "createENS",
    value: function createENS(provider, contractModuleFactory, accounts, abiCoder, utils, formatters, net, ensModuleOptions, nodeNet) {
      return new Ens(provider, ensModuleOptions, this, contractModuleFactory, accounts, abiCoder, utils, formatters, net, nodeNet);
    }
  }, {
    key: "createRegistry",
    value: function createRegistry(provider, contractModuleFactory, accounts, abiCoder, utils, formatters, options, net) {
      return new Registry(provider, contractModuleFactory, accounts, abiCoder, utils, formatters, options, net);
    }
  }]);
  return EnsModuleFactory;
}();

function Ens$1(provider) {
  var net = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var accounts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var abiCoder = new web3EthAbi.AbiCoder();
  var resolvedProvider = new web3Providers.ProviderResolver().resolve(provider, net);
  return new EnsModuleFactory().createENS(resolvedProvider, new web3EthContract.ContractModuleFactory(Utils, web3CoreHelpers.formatters, abiCoder), accounts, abiCoder, Utils, web3CoreHelpers.formatters, new web3Net.Network(resolvedProvider, null, options), options, null);
}

exports.Ens = Ens$1;
