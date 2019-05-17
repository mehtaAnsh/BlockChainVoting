import { Network } from 'web3-net';
import * as Utils from 'web3-utils';
import { formatters } from 'web3-core-helpers';
import { ProviderResolver } from 'web3-providers';
import { AbstractMethodFactory, ShhVersionMethod, GetInfoMethod, SetMaxMessageSizeMethod, SetMinPoWMethod, MarkTrustedPeerMethod, NewKeyPairMethod, AddPrivateKeyMethod, DeleteKeyPairMethod, HasKeyPairMethod, GetPublicKeyMethod, GetPrivateKeyMethod, NewSymKeyMethod, AddSymKeyMethod, GenerateSymKeyFromPasswordMethod, HasSymKeyMethod, GetSymKeyMethod, DeleteSymKeyMethod, NewMessageFilterMethod, GetFilterMessagesMethod, DeleteMessageFilterMethod, PostMethod } from 'web3-core-method';
import { MessagesSubscription } from 'web3-core-subscriptions';
import { AbstractWeb3Module } from 'web3-core';

class MethodFactory extends AbstractMethodFactory {
  constructor(utils, formatters) {
    super(utils, formatters);
    this.methods = {
      getVersion: ShhVersionMethod,
      getInfo: GetInfoMethod,
      setMaxMessageSize: SetMaxMessageSizeMethod,
      setMinPoW: SetMinPoWMethod,
      markTrustedPeer: MarkTrustedPeerMethod,
      newKeyPair: NewKeyPairMethod,
      addPrivateKey: AddPrivateKeyMethod,
      deleteKeyPair: DeleteKeyPairMethod,
      hasKeyPair: HasKeyPairMethod,
      getPublicKey: GetPublicKeyMethod,
      getPrivateKey: GetPrivateKeyMethod,
      newSymKey: NewSymKeyMethod,
      addSymKey: AddSymKeyMethod,
      generateSymKeyFromPassword: GenerateSymKeyFromPasswordMethod,
      hasSymKey: HasSymKeyMethod,
      getSymKey: GetSymKeyMethod,
      deleteSymKey: DeleteSymKeyMethod,
      newMessageFilter: NewMessageFilterMethod,
      getFilterMessages: GetFilterMessagesMethod,
      deleteMessageFilter: DeleteMessageFilterMethod,
      post: PostMethod
    };
  }
}

class SubscriptionsFactory {
  constructor(utils, formatters) {
    this.utils = utils;
    this.formatters = formatters;
  }
  getSubscription(moduleInstance, type, options) {
    switch (type) {
      case 'messages':
        return new MessagesSubscription(options, this.utils, this.formatters, moduleInstance);
      default:
        throw new Error(`Unknown subscription: ${type}`);
    }
  }
}

class Shh extends AbstractWeb3Module {
  constructor(provider, methodFactory, subscriptionsFactory, net, options, nodeNet) {
    super(provider, options, methodFactory, nodeNet);
    this.subscriptionsFactory = subscriptionsFactory;
    this.net = net;
  }
  subscribe(type, options, callback) {
    return this.subscriptionsFactory.getSubscription(this, type, options).subscribe(callback);
  }
  clearSubscriptions() {
    return super.clearSubscriptions('shh_unsubscribe');
  }
  setProvider(provider, net) {
    return this.net.setProvider(provider, net) && super.setProvider(provider, net);
  }
  set defaultGasPrice(value) {
    super.defaultGasPrice = value;
    this.net.defaultGasPrice = this.defaultGasPrice;
  }
  get defaultGasPrice() {
    return super.defaultGasPrice;
  }
  set defaultGas(value) {
    super.defaultGas = value;
    this.net.defaultGas = this.defaultGas;
  }
  get defaultGas() {
    return super.defaultGas;
  }
  set transactionBlockTimeout(value) {
    super.transactionBlockTimeout = value;
    this.net.transactionBlockTimeout = this.transactionBlockTimeout;
  }
  get transactionBlockTimeout() {
    return super.transactionBlockTimeout;
  }
  set transactionConfirmationBlocks(value) {
    super.transactionConfirmationBlocks = value;
    this.net.transactionConfirmationBlocks = this.transactionConfirmationBlocks;
  }
  get transactionConfirmationBlocks() {
    return super.transactionConfirmationBlocks;
  }
  set transactionPollingTimeout(value) {
    super.transactionPollingTimeout = value;
    this.net.transactionPollingTimeout = this.transactionPollingTimeout;
  }
  get transactionPollingTimeout() {
    return super.transactionPollingTimeout;
  }
  set defaultAccount(value) {
    super.defaultAccount = value;
    this.net.defaultAccount = this.defaultAccount;
  }
  get defaultAccount() {
    return super.defaultAccount;
  }
  set defaultBlock(value) {
    super.defaultBlock = value;
    this.net.defaultBlock = this.defaultBlock;
  }
  get defaultBlock() {
    return super.defaultBlock;
  }
}

function Shh$1(provider, net = null, options = {}) {
  const resolvedProvider = new ProviderResolver().resolve(provider, net);
  return new Shh(resolvedProvider, new MethodFactory(Utils, formatters), new SubscriptionsFactory(Utils, formatters), new Network(resolvedProvider, null, options), options, null);
}

export { Shh$1 as Shh };
