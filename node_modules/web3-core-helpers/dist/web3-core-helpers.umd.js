(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash/isString'), require('lodash/isArray'), require('lodash/isObject'), require('lodash/isNumber'), require('web3-utils'), require('web3-eth-iban')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash/isString', 'lodash/isArray', 'lodash/isObject', 'lodash/isNumber', 'web3-utils', 'web3-eth-iban'], factory) :
    (global = global || self, factory(global.Web3CoreHelpers = {}, global.isString, global.isArray, global.isObject, global.isNumber, global.Utils, global.web3EthIban));
}(this, function (exports, isString, isArray, isObject, isNumber, Utils, web3EthIban) { 'use strict';

    isString = isString && isString.hasOwnProperty('default') ? isString['default'] : isString;
    isArray = isArray && isArray.hasOwnProperty('default') ? isArray['default'] : isArray;
    isObject = isObject && isObject.hasOwnProperty('default') ? isObject['default'] : isObject;
    isNumber = isNumber && isNumber.hasOwnProperty('default') ? isNumber['default'] : isNumber;

    var outputBigNumberFormatter = function outputBigNumberFormatter(number) {
      return Utils.toBN(number).toString(10);
    };
    var isPredefinedBlockNumber = function isPredefinedBlockNumber(blockNumber) {
      return blockNumber === 'latest' || blockNumber === 'pending' || blockNumber === 'earliest';
    };
    var inputDefaultBlockNumberFormatter = function inputDefaultBlockNumberFormatter(blockNumber, moduleInstance) {
      if (blockNumber === undefined || blockNumber === null) {
        return moduleInstance.defaultBlock;
      }
      return inputBlockNumberFormatter(blockNumber);
    };
    var inputBlockNumberFormatter = function inputBlockNumberFormatter(blockNumber) {
      if (blockNumber === undefined || blockNumber === null || isPredefinedBlockNumber(blockNumber)) {
        return blockNumber;
      }
      if (Utils.isHexStrict(blockNumber)) {
        if (isString(blockNumber)) {
          return blockNumber.toLowerCase();
        }
        return blockNumber;
      }
      return Utils.numberToHex(blockNumber);
    };
    var txInputFormatter = function txInputFormatter(txObject) {
      if (txObject.to) {
        txObject.to = inputAddressFormatter(txObject.to);
      }
      if (txObject.data && txObject.input) {
        throw new Error('You can\'t have "data" and "input" as properties of transactions at the same time, please use either "data" or "input" instead.');
      }
      if (!txObject.data && txObject.input) {
        txObject.data = txObject.input;
        delete txObject.input;
      }
      if (txObject.data && !Utils.isHex(txObject.data)) {
        throw new Error('The data field must be HEX encoded data.');
      }
      if (txObject.gas || txObject.gasLimit) {
        txObject.gas = txObject.gas || txObject.gasLimit;
      }
      ['gasPrice', 'gas', 'value', 'nonce'].filter(function (key) {
        return txObject[key] !== undefined;
      }).forEach(function (key) {
        txObject[key] = Utils.numberToHex(txObject[key]);
      });
      return txObject;
    };
    var inputCallFormatter = function inputCallFormatter(txObject, moduleInstance) {
      txObject = txInputFormatter(txObject);
      var from = moduleInstance.defaultAccount;
      if (txObject.from) {
        from = txObject.from;
      }
      if (from) {
        txObject.from = inputAddressFormatter(from);
      }
      return txObject;
    };
    var inputTransactionFormatter = function inputTransactionFormatter(txObject, moduleInstance) {
      txObject = txInputFormatter(txObject);
      if (!isNumber(txObject.from) && !isObject(txObject.from)) {
        if (!txObject.from) {
          txObject.from = moduleInstance.defaultAccount;
        }
        if (!txObject.from && !isNumber(txObject.from)) {
          throw new Error('The send transactions "from" field must be defined!');
        }
        txObject.from = inputAddressFormatter(txObject.from);
      }
      return txObject;
    };
    var inputSignFormatter = function inputSignFormatter(data) {
      return Utils.isHexStrict(data) ? data : Utils.utf8ToHex(data);
    };
    var outputTransactionFormatter = function outputTransactionFormatter(receipt) {
      if (receipt.blockNumber !== null) {
        receipt.blockNumber = Utils.hexToNumber(receipt.blockNumber);
      }
      if (receipt.transactionIndex !== null) {
        receipt.transactionIndex = Utils.hexToNumber(receipt.transactionIndex);
      }
      if (receipt.gasPrice) {
        receipt.gasPrice = outputBigNumberFormatter(receipt.gasPrice);
      }
      if (receipt.value) {
        receipt.value = outputBigNumberFormatter(receipt.value);
      }
      receipt.nonce = Utils.hexToNumber(receipt.nonce);
      receipt.gas = Utils.hexToNumber(receipt.gas);
      if (receipt.to && Utils.isAddress(receipt.to)) {
        receipt.to = Utils.toChecksumAddress(receipt.to);
      } else {
        receipt.to = null;
      }
      if (receipt.from) {
        receipt.from = Utils.toChecksumAddress(receipt.from);
      }
      return receipt;
    };
    var outputTransactionReceiptFormatter = function outputTransactionReceiptFormatter(receipt) {
      if (receipt.blockNumber !== null) {
        receipt.blockNumber = Utils.hexToNumber(receipt.blockNumber);
      }
      if (receipt.transactionIndex !== null) {
        receipt.transactionIndex = Utils.hexToNumber(receipt.transactionIndex);
      }
      receipt.cumulativeGasUsed = Utils.hexToNumber(receipt.cumulativeGasUsed);
      receipt.gasUsed = Utils.hexToNumber(receipt.gasUsed);
      if (isArray(receipt.logs)) {
        receipt.logs = receipt.logs.map(outputLogFormatter);
      }
      if (receipt.contractAddress) {
        receipt.contractAddress = Utils.toChecksumAddress(receipt.contractAddress);
      }
      if (typeof receipt.status !== 'undefined' && receipt.status !== null) {
        receipt.status = Boolean(parseInt(receipt.status));
      } else {
        receipt.status = true;
      }
      return receipt;
    };
    var outputBlockFormatter = function outputBlockFormatter(block) {
      block.gasLimit = Utils.hexToNumber(block.gasLimit);
      block.gasUsed = Utils.hexToNumber(block.gasUsed);
      block.size = Utils.hexToNumber(block.size);
      block.timestamp = Utils.hexToNumber(block.timestamp);
      if (block.number !== null) {
        block.number = Utils.hexToNumber(block.number);
      }
      if (block.difficulty) {
        block.difficulty = outputBigNumberFormatter(block.difficulty);
      }
      if (block.totalDifficulty) {
        block.totalDifficulty = outputBigNumberFormatter(block.totalDifficulty);
      }
      if (isArray(block.transactions)) {
        block.transactions.forEach(function (item) {
          if (!isString(item)) return outputTransactionFormatter(item);
        });
      }
      if (block.miner) {
        block.miner = Utils.toChecksumAddress(block.miner);
      }
      return block;
    };
    var inputLogFormatter = function inputLogFormatter(options) {
      var toTopic = function toTopic(value) {
        if (value === null || typeof value === 'undefined') {
          return null;
        }
        value = String(value);
        if (value.indexOf('0x') === 0) {
          return value;
        }
        return Utils.fromUtf8(value);
      };
      if (options.fromBlock) {
        options.fromBlock = inputBlockNumberFormatter(options.fromBlock);
      }
      if (options.toBlock) {
        options.toBlock = inputBlockNumberFormatter(options.toBlock);
      }
      options.topics = options.topics || [];
      options.topics = options.topics.map(function (topic) {
        return isArray(topic) ? topic.map(toTopic) : toTopic(topic);
      });
      toTopic = null;
      if (options.address) {
        if (isArray(options.address)) {
          options.address = options.address.map(function (addr) {
            return inputAddressFormatter(addr);
          });
        } else {
          options.address = inputAddressFormatter(options.address);
        }
      }
      return options;
    };
    var outputLogFormatter = function outputLogFormatter(log) {
      if (typeof log.blockHash === 'string' && typeof log.transactionHash === 'string' && typeof log.logIndex === 'string') {
        var shaId = Utils.sha3(log.blockHash.replace('0x', '') + log.transactionHash.replace('0x', '') + log.logIndex.replace('0x', ''));
        shaId.replace('0x', '').substr(0, 8);
        log.id = "log_".concat(shaId);
      } else if (!log.id) {
        log.id = null;
      }
      if (log.blockNumber !== null) {
        log.blockNumber = Utils.hexToNumber(log.blockNumber);
      }
      if (log.transactionIndex !== null) {
        log.transactionIndex = Utils.hexToNumber(log.transactionIndex);
      }
      if (log.logIndex !== null) {
        log.logIndex = Utils.hexToNumber(log.logIndex);
      }
      if (log.address) {
        log.address = Utils.toChecksumAddress(log.address);
      }
      return log;
    };
    var inputPostFormatter = function inputPostFormatter(post) {
      if (post.ttl) {
        post.ttl = Utils.numberToHex(post.ttl);
      }
      if (post.workToProve) {
        post.workToProve = Utils.numberToHex(post.workToProve);
      }
      if (post.priority) {
        post.priority = Utils.numberToHex(post.priority);
      }
      if (!isArray(post.topics)) {
        post.topics = post.topics ? [post.topics] : [];
      }
      post.topics = post.topics.map(function (topic) {
        return topic.indexOf('0x') === 0 ? topic : Utils.fromUtf8(topic);
      });
      return post;
    };
    var outputPostFormatter = function outputPostFormatter(post) {
      post.expiry = Utils.hexToNumber(post.expiry);
      post.sent = Utils.hexToNumber(post.sent);
      post.ttl = Utils.hexToNumber(post.ttl);
      post.workProved = Utils.hexToNumber(post.workProved);
      if (!post.topics) {
        post.topics = [];
      }
      post.topics = post.topics.map(function (topic) {
        return Utils.toUtf8(topic);
      });
      return post;
    };
    var inputAddressFormatter = function inputAddressFormatter(address) {
      var iban = new web3EthIban.Iban(address);
      if (iban.isValid() && iban.isDirect()) {
        return iban.toAddress().toLowerCase();
      }
      if (Utils.isAddress(address)) {
        return "0x".concat(address.toLowerCase().replace('0x', ''));
      }
      throw new Error("Provided address \"".concat(address, "\" is invalid, the capitalization checksum test failed, or its an indrect IBAN address which can't be converted."));
    };
    var outputSyncingFormatter = function outputSyncingFormatter(result) {
      result.startingBlock = Utils.hexToNumber(result.startingBlock);
      result.currentBlock = Utils.hexToNumber(result.currentBlock);
      result.highestBlock = Utils.hexToNumber(result.highestBlock);
      if (result.knownStates) {
        result.knownStates = Utils.hexToNumber(result.knownStates);
        result.pulledStates = Utils.hexToNumber(result.pulledStates);
      }
      return result;
    };

    var Formatters = /*#__PURE__*/Object.freeze({
        outputBigNumberFormatter: outputBigNumberFormatter,
        isPredefinedBlockNumber: isPredefinedBlockNumber,
        inputDefaultBlockNumberFormatter: inputDefaultBlockNumberFormatter,
        inputBlockNumberFormatter: inputBlockNumberFormatter,
        txInputFormatter: txInputFormatter,
        inputCallFormatter: inputCallFormatter,
        inputTransactionFormatter: inputTransactionFormatter,
        inputSignFormatter: inputSignFormatter,
        outputTransactionFormatter: outputTransactionFormatter,
        outputTransactionReceiptFormatter: outputTransactionReceiptFormatter,
        outputBlockFormatter: outputBlockFormatter,
        inputLogFormatter: inputLogFormatter,
        outputLogFormatter: outputLogFormatter,
        inputPostFormatter: inputPostFormatter,
        outputPostFormatter: outputPostFormatter,
        inputAddressFormatter: inputAddressFormatter,
        outputSyncingFormatter: outputSyncingFormatter
    });

    exports.formatters = Formatters;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
