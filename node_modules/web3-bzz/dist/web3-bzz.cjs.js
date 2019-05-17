'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var isObject = _interopDefault(require('lodash/isObject'));
var isString = _interopDefault(require('lodash/isString'));
var swarm = require('swarm-js');

var Bzz =
function () {
  function Bzz(provider) {
    _classCallCheck(this, Bzz);
    this.givenProvider = Bzz.givenProvider;
    this.currentProvider = null;
    this.setProvider(provider);
  }
  _createClass(Bzz, [{
    key: "pick",
    value: function pick() {
      if (typeof document !== 'undefined') {
        return this.swarm.pick;
      }
      throw new Error('Pick is not supported for this environment.');
    }
  }, {
    key: "download",
    value: function download(bzzHash, localPath) {
      if (this.hasProvider()) {
        return this.swarm.download(bzzHash, localPath);
      }
      this.throwProviderError();
    }
  }, {
    key: "upload",
    value: function upload(data) {
      if (this.hasProvider()) {
        return this.swarm.upload(data);
      }
      this.throwProviderError();
    }
  }, {
    key: "isAvailable",
    value: function isAvailable() {
      if (this.hasProvider()) {
        return this.swarm.isAvailable();
      }
      this.throwProviderError();
    }
  }, {
    key: "hasProvider",
    value: function hasProvider() {
      return !!this.currentProvider;
    }
  }, {
    key: "throwProviderError",
    value: function throwProviderError() {
      throw new Error('No provider set, please set one using bzz.setProvider().');
    }
  }, {
    key: "setProvider",
    value: function setProvider(provider) {
      if (isObject(provider) && isString(provider.bzz)) {
        provider = provider.bzz;
      }
      if (isString(provider)) {
        this.currentProvider = provider;
        this.swarm = swarm.at(provider);
        return true;
      }
      this.currentProvider = null;
      return false;
    }
  }]);
  return Bzz;
}();
Bzz.givenProvider = null;
if (typeof ethereumProvider !== 'undefined' && ethereumProvider.bzz) {
  Bzz.givenProvider = ethereumProvider.bzz;
}

exports.Bzz = Bzz;
