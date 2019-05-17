import { Network } from 'web3-net';
import * as Utils from 'web3-utils';
import { formatters } from 'web3-core-helpers';
import { ProviderResolver } from 'web3-providers';
import { AbstractMethodFactory, GetAccountsMethod, NewAccountMethod, UnlockAccountMethod, LockAccountMethod, ImportRawKeyMethod, PersonalSendTransactionMethod, PersonalSignTransactionMethod, PersonalSignMethod, EcRecoverMethod } from 'web3-core-method';
import { AbstractWeb3Module } from 'web3-core';

class MethodFactory extends AbstractMethodFactory {
  constructor(utils, formatters) {
    super(utils, formatters);
    this.methods = {
      getAccounts: GetAccountsMethod,
      newAccount: NewAccountMethod,
      unlockAccount: UnlockAccountMethod,
      lockAccount: LockAccountMethod,
      importRawKey: ImportRawKeyMethod,
      sendTransaction: PersonalSendTransactionMethod,
      signTransaction: PersonalSignTransactionMethod,
      sign: PersonalSignMethod,
      ecRecover: EcRecoverMethod
    };
  }
}

class Personal extends AbstractWeb3Module {
  constructor(provider, methodFactory, net, utils, formatters, options, nodeNet) {
    super(provider, options, methodFactory, nodeNet);
    this.utils = utils;
    this.formatters = formatters;
    this.net = net;
  }
  setProvider(provider, net) {
    return !!(super.setProvider(provider, net) && this.net.setProvider(provider, net));
  }
  set defaultGasPrice(value) {
    super.defaultGasPrice = value;
    this.net.defaultGasPrice = value;
  }
  get defaultGasPrice() {
    return super.defaultGasPrice;
  }
  set defaultGas(value) {
    super.defaultGas = value;
    this.net.defaultGas = value;
  }
  get defaultGas() {
    return super.defaultGas;
  }
  set transactionBlockTimeout(value) {
    super.transactionBlockTimeout = value;
    this.net.transactionBlockTimeout = value;
  }
  get transactionBlockTimeout() {
    return super.transactionBlockTimeout;
  }
  set transactionConfirmationBlocks(value) {
    super.transactionConfirmationBlocks = value;
    this.net.transactionConfirmationBlocks = value;
  }
  get transactionConfirmationBlocks() {
    return super.transactionConfirmationBlocks;
  }
  set transactionPollingTimeout(value) {
    super.transactionPollingTimeout = value;
    this.net.transactionPollingTimeout = value;
  }
  get transactionPollingTimeout() {
    return super.transactionPollingTimeout;
  }
  set defaultAccount(value) {
    super.defaultAccount = value;
    this.net.defaultAccount = value;
  }
  get defaultAccount() {
    return super.defaultAccount;
  }
  set defaultBlock(value) {
    super.defaultBlock = value;
    this.net.defaultBlock = value;
  }
  get defaultBlock() {
    return super.defaultBlock;
  }
}

function Personal$1(provider, net = null, options = {}) {
  const resolvedProvider = new ProviderResolver().resolve(provider, net);
  return new Personal(resolvedProvider, new MethodFactory(Utils, formatters), new Network(resolvedProvider, null, options), Utils, formatters, options, null);
}

export { Personal$1 as Personal };
