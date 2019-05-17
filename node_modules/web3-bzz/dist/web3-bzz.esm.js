import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import { at } from 'swarm-js';

class Bzz {
  constructor(provider) {
    this.givenProvider = Bzz.givenProvider;
    this.currentProvider = null;
    this.setProvider(provider);
  }
  pick() {
    if (typeof document !== 'undefined') {
      return this.swarm.pick;
    }
    throw new Error('Pick is not supported for this environment.');
  }
  download(bzzHash, localPath) {
    if (this.hasProvider()) {
      return this.swarm.download(bzzHash, localPath);
    }
    this.throwProviderError();
  }
  upload(data) {
    if (this.hasProvider()) {
      return this.swarm.upload(data);
    }
    this.throwProviderError();
  }
  isAvailable() {
    if (this.hasProvider()) {
      return this.swarm.isAvailable();
    }
    this.throwProviderError();
  }
  hasProvider() {
    return !!this.currentProvider;
  }
  throwProviderError() {
    throw new Error('No provider set, please set one using bzz.setProvider().');
  }
  setProvider(provider) {
    if (isObject(provider) && isString(provider.bzz)) {
      provider = provider.bzz;
    }
    if (isString(provider)) {
      this.currentProvider = provider;
      this.swarm = at(provider);
      return true;
    }
    this.currentProvider = null;
    return false;
  }
}
Bzz.givenProvider = null;
if (typeof ethereumProvider !== 'undefined' && ethereumProvider.bzz) {
  Bzz.givenProvider = ethereumProvider.bzz;
}

export { Bzz };
