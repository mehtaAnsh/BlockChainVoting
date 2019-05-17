import { AbstractWeb3Module } from 'web3-core';
import { ProviderDetector, ProvidersModuleFactory } from 'web3-providers';
import * as Utils from 'web3-utils';
import { Eth } from 'web3-eth';
import { Shh } from 'web3-shh';
import { Bzz } from 'web3-bzz';
import { Network } from 'web3-net';
import { Personal } from 'web3-eth-personal';

var version = "1.0.0-beta.52";

class Web3 extends AbstractWeb3Module {
  constructor(provider, net, options = {}) {
    super(provider, options, null, net);
    this.eth = new Eth(this.currentProvider, net, options);
    this.shh = new Shh(this.currentProvider, net, options);
    this.bzz = new Bzz(this.currentProvider);
    this.utils = Utils;
    this.version = version;
  }
  set defaultGasPrice(value) {
    super.defaultGasPrice = value;
    this.eth.defaultGasPrice = value;
    this.shh.defaultGasPrice = value;
  }
  get defaultGasPrice() {
    return super.defaultGasPrice;
  }
  set defaultGas(value) {
    super.defaultGas = value;
    this.eth.defaultGas = value;
    this.shh.defaultGas = value;
  }
  get defaultGas() {
    return super.defaultGas;
  }
  set transactionBlockTimeout(value) {
    super.transactionBlockTimeout = value;
    this.eth.transactionBlockTimeout = value;
    this.shh.transactionBlockTimeout = value;
  }
  get transactionBlockTimeout() {
    return super.transactionBlockTimeout;
  }
  set transactionConfirmationBlocks(value) {
    super.transactionConfirmationBlocks = value;
    this.eth.transactionConfirmationBlocks = value;
    this.shh.transactionConfirmationBlocks = value;
  }
  get transactionConfirmationBlocks() {
    return super.transactionConfirmationBlocks;
  }
  set transactionPollingTimeout(value) {
    super.transactionPollingTimeout = value;
    this.eth.transactionPollingTimeout = value;
    this.shh.transactionPollingTimeout = value;
  }
  get transactionPollingTimeout() {
    return super.transactionPollingTimeout;
  }
  set defaultAccount(value) {
    super.defaultAccount = value;
    this.eth.defaultAccount = value;
    this.shh.defaultAccount = value;
  }
  get defaultAccount() {
    return super.defaultAccount;
  }
  set defaultBlock(value) {
    super.defaultBlock = value;
    this.eth.defaultBlock = value;
    this.shh.defaultBlock = value;
  }
  get defaultBlock() {
    return super.defaultBlock;
  }
  setProvider(provider, net) {
    return super.setProvider(provider, net) && this.eth.setProvider(provider, net) && this.shh.setProvider(provider, net) && this.bzz.setProvider(provider);
  }
  static get givenProvider() {
    return ProviderDetector.detect();
  }
  static get modules() {
    const providerResolver = new ProvidersModuleFactory().createProviderResolver();
    return {
      Eth: (provider, options, net) => {
        return new Eth(providerResolver.resolve(provider, net), options);
      },
      Net: (provider, options, net) => {
        return new Network(providerResolver.resolve(provider, net), options);
      },
      Personal: (provider, options, net) => {
        return new Personal(providerResolver.resolve(provider, net), options);
      },
      Shh: (provider, options, net) => {
        return new Shh(providerResolver.resolve(provider, net), options);
      },
      Bzz: provider => {
        return new Bzz(provider);
      }
    };
  }
}

export default Web3;
