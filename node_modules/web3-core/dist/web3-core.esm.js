import isObject from 'lodash/isObject';
import { ProviderResolver, ProviderDetector, BatchRequest, HttpProvider, WebsocketProvider, IpcProvider } from 'web3-providers';
import { MethodProxy } from 'web3-core-method';
import { toChecksumAddress } from 'web3-utils';

class AbstractWeb3Module {
  constructor(provider, options = {}, methodFactory = null, nodeNet = null) {
    this.providerResolver = new ProviderResolver();
    this.givenProvider = ProviderDetector.detect();
    this._currentProvider = this.providerResolver.resolve(provider, nodeNet);
    this._defaultAccount = options.defaultAccount ? toChecksumAddress(options.defaultAccount) : undefined;
    this._defaultBlock = options.defaultBlock || 'latest';
    this._transactionBlockTimeout = options.transactionBlockTimeout || 50;
    this._transactionConfirmationBlocks = options.transactionConfirmationBlocks || 24;
    this._transactionPollingTimeout = options.transactionPollingTimeout || 750;
    this._defaultGasPrice = options.defaultGasPrice;
    this._defaultGas = options.defaultGas;
    this.BatchRequest = () => {
      return new BatchRequest(this);
    };
    if (methodFactory) {
      return new MethodProxy(this, methodFactory);
    }
  }
  get defaultBlock() {
    return this._defaultBlock;
  }
  set defaultBlock(value) {
    this._defaultBlock = value;
  }
  get transactionBlockTimeout() {
    return this._transactionBlockTimeout;
  }
  set transactionBlockTimeout(value) {
    this._transactionBlockTimeout = value;
  }
  get transactionConfirmationBlocks() {
    return this._transactionConfirmationBlocks;
  }
  set transactionConfirmationBlocks(value) {
    this._transactionConfirmationBlocks = value;
  }
  get transactionPollingTimeout() {
    return this._transactionPollingTimeout;
  }
  set transactionPollingTimeout(value) {
    this._transactionPollingTimeout = value;
  }
  get defaultGasPrice() {
    return this._defaultGasPrice;
  }
  set defaultGasPrice(value) {
    this._defaultGasPrice = value;
  }
  get defaultGas() {
    return this._defaultGas;
  }
  set defaultGas(value) {
    this._defaultGas = value;
  }
  static get providers() {
    return {
      HttpProvider,
      WebsocketProvider,
      IpcProvider
    };
  }
  get defaultAccount() {
    return this._defaultAccount;
  }
  set defaultAccount(value) {
    this._defaultAccount = toChecksumAddress(value);
  }
  get currentProvider() {
    return this._currentProvider;
  }
  set currentProvider(value) {
    throw new Error('The property currentProvider is read-only!');
  }
  setProvider(provider, net) {
    if (!this.isSameProvider(provider)) {
      const resolvedProvider = this.providerResolver.resolve(provider, net);
      this.clearSubscriptions();
      this._currentProvider = resolvedProvider;
      return true;
    }
    return false;
  }
  isSameProvider(provider) {
    if (isObject(provider)) {
      if (this.currentProvider.constructor.name === provider.constructor.name) {
        return this.currentProvider.host === provider.host;
      }
      return false;
    }
    return this.currentProvider.host === provider;
  }
  clearSubscriptions(unsubscribeMethod) {
    if (typeof this.currentProvider.clearSubscriptions !== 'undefined' && this.currentProvider.subscriptions.length > 0) {
      return this.currentProvider.clearSubscriptions(unsubscribeMethod);
    }
    return Promise.resolve(true);
  }
}

export { AbstractWeb3Module };
