'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Utils = require('web3-utils');
var abiCoder = require('ethers/utils/abi-coder');
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var isArray = _interopDefault(require('lodash/isArray'));
var isObject = _interopDefault(require('lodash/isObject'));

var AbiCoder =
function () {
  function AbiCoder(utils, ethersAbiCoder) {
    _classCallCheck(this, AbiCoder);
    this.utils = utils;
    this.ethersAbiCoder = ethersAbiCoder;
  }
  _createClass(AbiCoder, [{
    key: "encodeFunctionSignature",
    value: function encodeFunctionSignature(functionName) {
      if (isObject(functionName)) {
        functionName = this.utils.jsonInterfaceMethodToString(functionName);
      }
      return this.utils.sha3(functionName).slice(0, 10);
    }
  }, {
    key: "encodeEventSignature",
    value: function encodeEventSignature(functionName) {
      if (isObject(functionName)) {
        functionName = this.utils.jsonInterfaceMethodToString(functionName);
      }
      return this.utils.sha3(functionName);
    }
  }, {
    key: "encodeParameter",
    value: function encodeParameter(type, param) {
      return this.encodeParameters([type], [param]);
    }
  }, {
    key: "encodeParameters",
    value: function encodeParameters(types, params) {
      return this.ethersAbiCoder.encode(types, params);
    }
  }, {
    key: "encodeFunctionCall",
    value: function encodeFunctionCall(jsonInterface, params) {
      return this.encodeFunctionSignature(jsonInterface) + this.encodeParameters(jsonInterface.inputs, params).replace('0x', '');
    }
  }, {
    key: "decodeParameter",
    value: function decodeParameter(type, bytes) {
      return this.decodeParameters([type], bytes)[0];
    }
  }, {
    key: "decodeParameters",
    value: function decodeParameters(outputs, bytes) {
      if (isArray(outputs) && outputs.length === 0) {
        throw new Error('Empty outputs array given!');
      }
      if (!bytes || bytes === '0x' || bytes === '0X') {
        throw new Error("Invalid bytes string given: ".concat(bytes));
      }
      var result = this.ethersAbiCoder.decode(outputs, bytes);
      var returnValues = {};
      var decodedValue;
      if (isArray(result)) {
        if (outputs.length > 1) {
          outputs.forEach(function (output, i) {
            decodedValue = result[i];
            if (decodedValue === '0x') {
              decodedValue = null;
            }
            returnValues[i] = decodedValue;
            if (isObject(output) && output.name) {
              returnValues[output.name] = decodedValue;
            }
          });
          return returnValues;
        }
        return result;
      }
      if (isObject(outputs[0]) && outputs[0].name) {
        returnValues[outputs[0].name] = result;
      }
      returnValues[0] = result;
      return returnValues;
    }
  }, {
    key: "decodeLog",
    value: function decodeLog(inputs) {
      var _this = this;
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var topics = arguments.length > 2 ? arguments[2] : undefined;
      var returnValues = {};
      var topicCount = 0;
      var value;
      var nonIndexedInputKeys = [];
      var nonIndexedInputItems = [];
      if (!isArray(topics)) {
        topics = [topics];
      }
      inputs.forEach(function (input, i) {
        if (input.indexed) {
          if (input.type === 'string') {
            return;
          }
          value = topics[topicCount];
          if (_this.isStaticType(input.type)) {
            value = _this.decodeParameter(input.type, topics[topicCount]);
          }
          returnValues[i] = value;
          returnValues[input.name] = value;
          topicCount++;
          return;
        }
        nonIndexedInputKeys.push(i);
        nonIndexedInputItems.push(input);
      });
      if (data) {
        var values = this.decodeParameters(nonIndexedInputItems, data);
        var decodedValue;
        nonIndexedInputKeys.forEach(function (itemKey, index) {
          decodedValue = values[index];
          returnValues[itemKey] = decodedValue;
          returnValues[nonIndexedInputItems[index].name] = decodedValue;
        });
      }
      return returnValues;
    }
  }, {
    key: "isStaticType",
    value: function isStaticType(type) {
      if (type === 'bytes') {
        return false;
      }
      if (type === 'string') {
        return false;
      }
      if (type.indexOf('[') && type.slice(type.indexOf('[')).length === 2) {
        return false;
      }
      return true;
    }
  }]);
  return AbiCoder;
}();

function AbiCoder$1() {
  return new AbiCoder(Utils, new abiCoder.AbiCoder());
}

exports.AbiCoder = AbiCoder$1;
