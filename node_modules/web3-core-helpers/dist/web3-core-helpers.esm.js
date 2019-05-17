import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isNumber from 'lodash/isNumber';
import { toBN, isHexStrict, numberToHex, isHex, utf8ToHex, hexToNumber, isAddress, toChecksumAddress, sha3, fromUtf8, toUtf8 } from 'web3-utils';
import { Iban } from 'web3-eth-iban';

const outputBigNumberFormatter = number => {
  return toBN(number).toString(10);
};
const isPredefinedBlockNumber = blockNumber => {
  return blockNumber === 'latest' || blockNumber === 'pending' || blockNumber === 'earliest';
};
const inputDefaultBlockNumberFormatter = (blockNumber, moduleInstance) => {
  if (blockNumber === undefined || blockNumber === null) {
    return moduleInstance.defaultBlock;
  }
  return inputBlockNumberFormatter(blockNumber);
};
const inputBlockNumberFormatter = blockNumber => {
  if (blockNumber === undefined || blockNumber === null || isPredefinedBlockNumber(blockNumber)) {
    return blockNumber;
  }
  if (isHexStrict(blockNumber)) {
    if (isString(blockNumber)) {
      return blockNumber.toLowerCase();
    }
    return blockNumber;
  }
  return numberToHex(blockNumber);
};
const txInputFormatter = txObject => {
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
  if (txObject.data && !isHex(txObject.data)) {
    throw new Error('The data field must be HEX encoded data.');
  }
  if (txObject.gas || txObject.gasLimit) {
    txObject.gas = txObject.gas || txObject.gasLimit;
  }
  ['gasPrice', 'gas', 'value', 'nonce'].filter(key => {
    return txObject[key] !== undefined;
  }).forEach(key => {
    txObject[key] = numberToHex(txObject[key]);
  });
  return txObject;
};
const inputCallFormatter = (txObject, moduleInstance) => {
  txObject = txInputFormatter(txObject);
  let from = moduleInstance.defaultAccount;
  if (txObject.from) {
    from = txObject.from;
  }
  if (from) {
    txObject.from = inputAddressFormatter(from);
  }
  return txObject;
};
const inputTransactionFormatter = (txObject, moduleInstance) => {
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
const inputSignFormatter = data => {
  return isHexStrict(data) ? data : utf8ToHex(data);
};
const outputTransactionFormatter = receipt => {
  if (receipt.blockNumber !== null) {
    receipt.blockNumber = hexToNumber(receipt.blockNumber);
  }
  if (receipt.transactionIndex !== null) {
    receipt.transactionIndex = hexToNumber(receipt.transactionIndex);
  }
  if (receipt.gasPrice) {
    receipt.gasPrice = outputBigNumberFormatter(receipt.gasPrice);
  }
  if (receipt.value) {
    receipt.value = outputBigNumberFormatter(receipt.value);
  }
  receipt.nonce = hexToNumber(receipt.nonce);
  receipt.gas = hexToNumber(receipt.gas);
  if (receipt.to && isAddress(receipt.to)) {
    receipt.to = toChecksumAddress(receipt.to);
  } else {
    receipt.to = null;
  }
  if (receipt.from) {
    receipt.from = toChecksumAddress(receipt.from);
  }
  return receipt;
};
const outputTransactionReceiptFormatter = receipt => {
  if (receipt.blockNumber !== null) {
    receipt.blockNumber = hexToNumber(receipt.blockNumber);
  }
  if (receipt.transactionIndex !== null) {
    receipt.transactionIndex = hexToNumber(receipt.transactionIndex);
  }
  receipt.cumulativeGasUsed = hexToNumber(receipt.cumulativeGasUsed);
  receipt.gasUsed = hexToNumber(receipt.gasUsed);
  if (isArray(receipt.logs)) {
    receipt.logs = receipt.logs.map(outputLogFormatter);
  }
  if (receipt.contractAddress) {
    receipt.contractAddress = toChecksumAddress(receipt.contractAddress);
  }
  if (typeof receipt.status !== 'undefined' && receipt.status !== null) {
    receipt.status = Boolean(parseInt(receipt.status));
  } else {
    receipt.status = true;
  }
  return receipt;
};
const outputBlockFormatter = block => {
  block.gasLimit = hexToNumber(block.gasLimit);
  block.gasUsed = hexToNumber(block.gasUsed);
  block.size = hexToNumber(block.size);
  block.timestamp = hexToNumber(block.timestamp);
  if (block.number !== null) {
    block.number = hexToNumber(block.number);
  }
  if (block.difficulty) {
    block.difficulty = outputBigNumberFormatter(block.difficulty);
  }
  if (block.totalDifficulty) {
    block.totalDifficulty = outputBigNumberFormatter(block.totalDifficulty);
  }
  if (isArray(block.transactions)) {
    block.transactions.forEach(item => {
      if (!isString(item)) return outputTransactionFormatter(item);
    });
  }
  if (block.miner) {
    block.miner = toChecksumAddress(block.miner);
  }
  return block;
};
const inputLogFormatter = options => {
  let toTopic = value => {
    if (value === null || typeof value === 'undefined') {
      return null;
    }
    value = String(value);
    if (value.indexOf('0x') === 0) {
      return value;
    }
    return fromUtf8(value);
  };
  if (options.fromBlock) {
    options.fromBlock = inputBlockNumberFormatter(options.fromBlock);
  }
  if (options.toBlock) {
    options.toBlock = inputBlockNumberFormatter(options.toBlock);
  }
  options.topics = options.topics || [];
  options.topics = options.topics.map(topic => {
    return isArray(topic) ? topic.map(toTopic) : toTopic(topic);
  });
  toTopic = null;
  if (options.address) {
    if (isArray(options.address)) {
      options.address = options.address.map(addr => {
        return inputAddressFormatter(addr);
      });
    } else {
      options.address = inputAddressFormatter(options.address);
    }
  }
  return options;
};
const outputLogFormatter = log => {
  if (typeof log.blockHash === 'string' && typeof log.transactionHash === 'string' && typeof log.logIndex === 'string') {
    const shaId = sha3(log.blockHash.replace('0x', '') + log.transactionHash.replace('0x', '') + log.logIndex.replace('0x', ''));
    shaId.replace('0x', '').substr(0, 8);
    log.id = `log_${shaId}`;
  } else if (!log.id) {
    log.id = null;
  }
  if (log.blockNumber !== null) {
    log.blockNumber = hexToNumber(log.blockNumber);
  }
  if (log.transactionIndex !== null) {
    log.transactionIndex = hexToNumber(log.transactionIndex);
  }
  if (log.logIndex !== null) {
    log.logIndex = hexToNumber(log.logIndex);
  }
  if (log.address) {
    log.address = toChecksumAddress(log.address);
  }
  return log;
};
const inputPostFormatter = post => {
  if (post.ttl) {
    post.ttl = numberToHex(post.ttl);
  }
  if (post.workToProve) {
    post.workToProve = numberToHex(post.workToProve);
  }
  if (post.priority) {
    post.priority = numberToHex(post.priority);
  }
  if (!isArray(post.topics)) {
    post.topics = post.topics ? [post.topics] : [];
  }
  post.topics = post.topics.map(topic => {
    return topic.indexOf('0x') === 0 ? topic : fromUtf8(topic);
  });
  return post;
};
const outputPostFormatter = post => {
  post.expiry = hexToNumber(post.expiry);
  post.sent = hexToNumber(post.sent);
  post.ttl = hexToNumber(post.ttl);
  post.workProved = hexToNumber(post.workProved);
  if (!post.topics) {
    post.topics = [];
  }
  post.topics = post.topics.map(topic => {
    return toUtf8(topic);
  });
  return post;
};
const inputAddressFormatter = address => {
  const iban = new Iban(address);
  if (iban.isValid() && iban.isDirect()) {
    return iban.toAddress().toLowerCase();
  }
  if (isAddress(address)) {
    return `0x${address.toLowerCase().replace('0x', '')}`;
  }
  throw new Error(`Provided address "${address}" is invalid, the capitalization checksum test failed, or its an indrect IBAN address which can't be converted.`);
};
const outputSyncingFormatter = result => {
  result.startingBlock = hexToNumber(result.startingBlock);
  result.currentBlock = hexToNumber(result.currentBlock);
  result.highestBlock = hexToNumber(result.highestBlock);
  if (result.knownStates) {
    result.knownStates = hexToNumber(result.knownStates);
    result.pulledStates = hexToNumber(result.pulledStates);
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

export { Formatters as formatters };
