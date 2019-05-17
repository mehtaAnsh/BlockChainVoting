import { w3cwebsocket } from 'websocket';
import { XMLHttpRequest as XMLHttpRequest$1 } from 'xhr2-cookies';
import URL from 'url-parse';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import EventEmitter from 'eventemitter3';
import isArray from 'lodash/isArray';
import http from 'http';
import https from 'https';

const global = function () {
  return this || typeof self === 'object' && self;
}() || new Function('return this')();
class ProviderResolver {
  constructor(providersModuleFactory) {
    this.providersModuleFactory = providersModuleFactory;
  }
  resolve(provider, net) {
    if (typeof provider === 'string') {
      if (/^http(s)?:\/\//i.test(provider)) {
        return this.providersModuleFactory.createHttpProvider(provider);
      }
      if (/^ws(s)?:\/\//i.test(provider)) {
        return this.providersModuleFactory.createWebsocketProvider(provider);
      }
      if (provider && isObject(net) && isFunction(net.connect)) {
        return this.providersModuleFactory.createIpcProvider(provider, net);
      }
    }
    if (provider.sendPayload && provider.subscribe) {
      return provider;
    }
    if (typeof global.mist !== 'undefined' && provider.constructor.name === 'EthereumProvider') {
      return this.providersModuleFactory.createMistEthereumProvider(provider);
    }
    if (provider.isEIP1193) {
      return this.providersModuleFactory.createWeb3EthereumProvider(provider);
    }
    if (this.isMetamaskInpageProvider(provider)) {
      return this.providersModuleFactory.createMetamaskProvider(provider);
    }
    return this.providersModuleFactory.createCustomProvider(provider);
  }
  isMetamaskInpageProvider(provider) {
    return provider.constructor.name === 'MetamaskInpageProvider';
  }
}

let messageId = 0;
class JsonRpcMapper {
  static toPayload(method, params) {
    if (!method) {
      throw new Error(`JSONRPC method should be specified for params: "${JSON.stringify(params)}"!`);
    }
    const id = messageId;
    messageId++;
    return {
      jsonrpc: '2.0',
      id,
      method,
      params: params || []
    };
  }
}

class JsonRpcResponseValidator {
  static validate(response, payload = false) {
    if (isObject(response)) {
      if (response.error) {
        if (response.error instanceof Error) {
          return new Error(`Node error: ${response.error.message}`);
        }
        return new Error(`Node error: ${JSON.stringify(response.error)}`);
      }
      if (payload && response.id !== payload.id) {
        return new Error(`Validation error: Invalid JSON-RPC response ID (request: ${payload.id} / response: ${response.id})`);
      }
      if (response.result === undefined) {
        return new Error('Validation error: Undefined JSON-RPC result');
      }
      return true;
    }
    return new Error('Validation error: Response should be of type Object');
  }
}

class AbstractSocketProvider extends EventEmitter {
  constructor(connection, timeout) {
    super();
    this.connection = connection;
    this.timeout = timeout;
    this.subscriptions = {};
    this.registerEventListeners();
    this.READY = 'ready';
    this.CONNECT = 'connect';
    this.ERROR = 'error';
    this.CLOSE = 'close';
    this.SOCKET_MESSAGE = 'socket_message';
    this.SOCKET_READY = 'socket_ready';
    this.SOCKET_CLOSE = 'socket_close';
    this.SOCKET_ERROR = 'socket_error';
    this.SOCKET_CONNECT = 'socket_connect';
    this.SOCKET_NETWORK_CHANGED = 'socket_networkChanged';
    this.SOCKET_ACCOUNTS_CHANGED = 'socket_accountsChanged';
  }
  supportsSubscriptions() {
    return true;
  }
  registerEventListeners() {}
  removeAllSocketListeners() {
    this.removeAllListeners(this.SOCKET_MESSAGE);
    this.removeAllListeners(this.SOCKET_READY);
    this.removeAllListeners(this.SOCKET_CLOSE);
    this.removeAllListeners(this.SOCKET_ERROR);
    this.removeAllListeners(this.SOCKET_CONNECT);
  }
  disconnect(code, reason) {}
  get connected() {}
  async send(method, parameters) {
    const response = await this.sendPayload(JsonRpcMapper.toPayload(method, parameters));
    const validationResult = JsonRpcResponseValidator.validate(response);
    if (validationResult instanceof Error) {
      throw validationResult;
    }
    return response.result;
  }
  sendBatch(methods, moduleInstance) {
    let payload = [];
    methods.forEach(method => {
      method.beforeExecution(moduleInstance);
      payload.push(JsonRpcMapper.toPayload(method.rpcMethod, method.parameters));
    });
    return this.sendPayload(payload);
  }
  onReady(event) {
    this.emit(this.READY, event);
    this.emit(this.SOCKET_READY, event);
  }
  onError(error) {
    this.emit(this.ERROR, error);
    this.emit(this.SOCKET_ERROR, error);
    this.removeAllSocketListeners();
    this.removeAllListeners();
  }
  onClose(error = null) {
    this.emit(this.CLOSE, error);
    this.emit(this.SOCKET_CLOSE, error);
    this.removeAllSocketListeners();
    this.removeAllListeners();
  }
  async onConnect() {
    const subscriptionKeys = Object.keys(this.subscriptions);
    if (subscriptionKeys.length > 0) {
      let subscriptionId;
      for (let key of subscriptionKeys) {
        subscriptionId = await this.subscribe(this.subscriptions[key].subscribeMethod, this.subscriptions[key].parameters[0], this.subscriptions[key].parameters.slice(1));
        delete this.subscriptions[subscriptionId];
        this.subscriptions[key].id = subscriptionId;
      }
    }
    this.emit(this.SOCKET_CONNECT);
    this.emit(this.CONNECT);
  }
  onMessage(response) {
    let event;
    if (!isObject(response)) {
      response = JSON.parse(response);
    }
    if (isArray(response)) {
      event = response[0].id;
    } else if (typeof response.id === 'undefined') {
      event = this.getSubscriptionEvent(response.params.subscription);
      response = response.params;
    } else {
      event = response.id;
    }
    this.emit(this.SOCKET_MESSAGE, response);
    this.emit(event, response);
  }
  reset() {
    this.removeAllListeners();
    this.registerEventListeners();
  }
  subscribe(subscribeMethod = 'eth_subscribe', subscriptionMethod, parameters) {
    parameters.unshift(subscriptionMethod);
    return this.send(subscribeMethod, parameters).then(subscriptionId => {
      this.subscriptions[subscriptionId] = {
        id: subscriptionId,
        subscribeMethod: subscribeMethod,
        parameters: parameters
      };
      return subscriptionId;
    }).catch(error => {
      throw new Error(`Provider error: ${error}`);
    });
  }
  unsubscribe(subscriptionId, unsubscribeMethod = 'eth_unsubscribe') {
    if (this.hasSubscription(subscriptionId)) {
      return this.send(unsubscribeMethod, [subscriptionId]).then(response => {
        if (response) {
          this.removeAllListeners(this.getSubscriptionEvent(subscriptionId));
          delete this.subscriptions[subscriptionId];
        }
        return response;
      });
    }
    return Promise.reject(new Error(`Provider error: Subscription with ID ${subscriptionId} does not exist.`));
  }
  clearSubscriptions(unsubscribeMethod = 'eth_unsubscribe') {
    let unsubscribePromises = [];
    Object.keys(this.subscriptions).forEach(key => {
      this.removeAllListeners(key);
      unsubscribePromises.push(this.unsubscribe(this.subscriptions[key].id, unsubscribeMethod));
    });
    return Promise.all(unsubscribePromises).then(results => {
      if (results.includes(false)) {
        throw new Error(`Could not unsubscribe all subscriptions: ${JSON.stringify(results)}`);
      }
      return true;
    });
  }
  hasSubscription(subscriptionId) {
    return typeof this.getSubscriptionEvent(subscriptionId) !== 'undefined';
  }
  getSubscriptionEvent(subscriptionId) {
    if (this.subscriptions[subscriptionId]) {
      return subscriptionId;
    }
    let event;
    Object.keys(this.subscriptions).forEach(key => {
      if (this.subscriptions[key].id === subscriptionId) {
        event = key;
      }
    });
    return event;
  }
}

class WebsocketProvider extends AbstractSocketProvider {
  constructor(connection, timeout) {
    super(connection, timeout);
    this.host = this.connection.url;
  }
  onMessage(messageEvent) {
    super.onMessage(messageEvent.data);
  }
  onError(event) {
    if (event.code === 'ECONNREFUSED') {
      this.reconnect();
      return;
    }
    super.onError(event);
  }
  onClose(closeEvent) {
    if (closeEvent.code !== 1000 || closeEvent.wasClean === false) {
      this.reconnect();
      return;
    }
    super.onClose();
  }
  reconnect() {
    setTimeout(() => {
      this.removeAllSocketListeners();
      let connection = [];
      if (this.connection.constructor.name === 'W3CWebsocket') {
        connection = new this.connection.constructor(this.host, this.connection._client.protocol, null, this.connection._client.headers, this.connection._client.requestOptions, this.connection._client.config);
      } else {
        connection = new this.connection.constructor(this.host, this.connection.protocol || undefined);
      }
      this.connection = connection;
      this.registerEventListeners();
    }, 5000);
  }
  disconnect(code = null, reason = null) {
    this.connection.close(code, reason);
  }
  registerEventListeners() {
    this.connection.addEventListener('message', this.onMessage.bind(this));
    this.connection.addEventListener('open', this.onReady.bind(this));
    this.connection.addEventListener('open', this.onConnect.bind(this));
    this.connection.addEventListener('close', this.onClose.bind(this));
    this.connection.addEventListener('error', this.onError.bind(this));
  }
  removeAllListeners(event) {
    switch (event) {
      case this.SOCKET_MESSAGE:
        this.connection.removeEventListener('message', this.onMessage);
        break;
      case this.SOCKET_READY:
        this.connection.removeEventListener('open', this.onReady);
        break;
      case this.SOCKET_CLOSE:
        this.connection.removeEventListener('close', this.onClose);
        break;
      case this.SOCKET_ERROR:
        this.connection.removeEventListener('error', this.onError);
        break;
      case this.SOCKET_CONNECT:
        this.connection.removeEventListener('connect', this.onConnect);
        break;
    }
    super.removeAllListeners(event);
  }
  get connected() {
    return this.connection.readyState === this.connection.OPEN;
  }
  isConnecting() {
    return this.connection.readyState === this.connection.CONNECTING;
  }
  sendPayload(payload) {
    return new Promise((resolve, reject) => {
      if (!this.isConnecting()) {
        let timeout, id;
        if (this.connection.readyState !== this.connection.OPEN) {
          return reject(new Error('Connection error: Connection is not open on send()'));
        }
        try {
          this.connection.send(JSON.stringify(payload));
        } catch (error) {
          reject(error);
        }
        if (this.timeout) {
          timeout = setTimeout(() => {
            reject(new Error('Connection error: Timeout exceeded'));
          }, this.timeout);
        }
        if (isArray(payload)) {
          id = payload[0].id;
        } else {
          id = payload.id;
        }
        this.once(id, response => {
          if (timeout) {
            clearTimeout(timeout);
          }
          return resolve(response);
        });
        return;
      }
      this.once('connect', () => {
        this.sendPayload(payload).then(resolve).catch(reject);
      });
    });
  }
}

class IpcProvider extends AbstractSocketProvider {
  constructor(connection, path) {
    super(connection, null);
    this.host = path;
    this.lastChunk = '';
  }
  disconnect() {
    this.connection.destroy();
  }
  get connected() {
    return !this.connection.pending;
  }
  reconnect() {
    this.connection.connect({
      path: this.path
    });
  }
  onMessage(message) {
    let result = null;
    let returnValues = [];
    let dechunkedData = message.toString().replace(/\}[\n\r]?\{/g, '}|--|{')
    .replace(/\}\][\n\r]?\[\{/g, '}]|--|[{')
    .replace(/\}[\n\r]?\[\{/g, '}|--|[{')
    .replace(/\}\][\n\r]?\{/g, '}]|--|{')
    .split('|--|');
    dechunkedData.forEach(data => {
      result = null;
      if (this.lastChunk) {
        data = this.lastChunk + data;
      }
      try {
        result = JSON.parse(data);
      } catch (error) {
        this.lastChunk = data;
        return;
      }
      this.lastChunk = null;
      returnValues.push(result);
    });
    returnValues.forEach(chunk => {
      super.onMessage(chunk);
    });
  }
  registerEventListeners() {
    this.connection.on('data', this.onMessage.bind(this));
    this.connection.on('connect', this.onConnect.bind(this));
    this.connection.on('error', this.onError.bind(this));
    this.connection.on('close', this.onClose.bind(this));
    this.connection.on('timeout', this.onClose.bind(this));
    this.connection.on('ready', this.onReady.bind(this));
  }
  removeAllListeners(event) {
    switch (event) {
      case this.SOCKET_MESSAGE:
        this.connection.removeListener('data', this.onMessage);
        break;
      case this.SOCKET_READY:
        this.connection.removeListener('ready', this.onReady);
        break;
      case this.SOCKET_CLOSE:
        this.connection.removeListener('close', this.onClose);
        break;
      case this.SOCKET_ERROR:
        this.connection.removeListener('error', this.onError);
        break;
      case this.SOCKET_CONNECT:
        this.connection.removeListener('connect', this.onConnect);
        break;
    }
    super.removeAllListeners(event);
  }
  sendPayload(payload) {
    return new Promise((resolve, reject) => {
      if (!this.connection.writable) {
        this.connection.connect({
          path: this.path
        });
      }
      if (this.connection.write(JSON.stringify(payload))) {
        let id;
        if (isArray(payload)) {
          id = payload[0].id;
        } else {
          id = payload.id;
        }
        this.once(id, resolve);
        return;
      }
      return reject(new Error("Connection error: Couldn't write on the socket with Socket.write(payload)"));
    });
  }
}

class HttpProvider {
  constructor(host = 'http://localhost:8545', options = {}, providersModuleFactory) {
    this.host = host;
    this.timeout = options.timeout || 0;
    this.headers = options.headers;
    this.withCredentials = options.withCredentials || false;
    this.connected = true;
    this.providersModuleFactory = providersModuleFactory;
    this.agent = {};
    let keepAlive = false;
    if (options.keepAlive === true || options.keepAlive !== false) {
      keepAlive = true;
    }
    if (host.substring(0, 5) === 'https') {
      this.agent['httpsAgent'] = new https.Agent({
        keepAlive
      });
    } else {
      this.agent['httpAgent'] = new http.Agent({
        keepAlive
      });
    }
  }
  supportsSubscriptions() {
    return false;
  }
  subscribe() {
    throw new Error('Subscriptions are not supported with the HttpProvider.');
  }
  unsubscribe() {
    throw new Error('Subscriptions are not supported with the HttpProvider.');
  }
  disconnect() {
    return true;
  }
  async send(method, parameters) {
    const response = await this.sendPayload(JsonRpcMapper.toPayload(method, parameters));
    const validationResult = JsonRpcResponseValidator.validate(response);
    if (validationResult instanceof Error) {
      throw validationResult;
    }
    return response.result;
  }
  sendBatch(methods, moduleInstance) {
    let payload = [];
    methods.forEach(method => {
      method.beforeExecution(moduleInstance);
      payload.push(JsonRpcMapper.toPayload(method.rpcMethod, method.parameters));
    });
    return this.sendPayload(payload);
  }
  sendPayload(payload) {
    return new Promise((resolve, reject) => {
      const request = this.providersModuleFactory.createXMLHttpRequest(this.host, this.timeout, this.headers, this.agent, this.withCredentials);
      request.onreadystatechange = () => {
        if (request.readyState !== 0 && request.readyState !== 1) {
          this.connected = true;
        }
        if (request.readyState === 4) {
          if (request.status === 200) {
            try {
              return resolve(JSON.parse(request.responseText));
            } catch (error) {
              reject(new Error(`Invalid JSON as response: ${request.responseText}`));
            }
          }
          if (this.isInvalidHttpEndpoint(request)) {
            reject(new Error(`Connection refused or URL couldn't be resolved: ${this.host}`));
          }
        }
      };
      request.ontimeout = () => {
        this.connected = false;
        reject(new Error(`Connection error: Timeout exceeded after ${this.timeout}ms`));
      };
      try {
        request.send(JSON.stringify(payload));
      } catch (error) {
        this.connected = false;
        reject(error);
      }
    });
  }
  isInvalidHttpEndpoint(request) {
    return request.response === null && request.status === 0;
  }
}

class BatchRequest {
  constructor(moduleInstance) {
    this.moduleInstance = moduleInstance;
    this.methods = [];
  }
  add(method) {
    if (!isObject(method) && method) {
      throw new Error('Please provide a object of type AbstractMethod.');
    }
    this.methods.push(method);
  }
  execute() {
    return this.moduleInstance.currentProvider.sendBatch(this.methods, this.moduleInstance).then(response => {
      let errors = [];
      this.methods.forEach((method, index) => {
        if (!isArray(response)) {
          method.callback(new Error(`BatchRequest error: Response should be of type Array but is: ${typeof response}`), null);
          errors.push(`Response should be of type Array but is: ${typeof response}`);
          return;
        }
        const responseItem = response[index] || null;
        const validationResult = JsonRpcResponseValidator.validate(responseItem);
        if (validationResult) {
          try {
            const mappedResult = method.afterExecution(responseItem.result);
            response[index] = mappedResult;
            method.callback(false, mappedResult);
          } catch (error) {
            errors.push(error);
            method.callback(error, null);
          }
          return;
        }
        errors.push(validationResult);
        method.callback(validationResult, null);
      });
      if (errors.length > 0) {
        throw new Error(`BatchRequest error: ${JSON.stringify(errors)}`);
      }
      return {
        methods: this.methods,
        response
      };
    });
  }
}

class Web3EthereumProvider extends AbstractSocketProvider {
  constructor(connection) {
    super(connection, null);
    this.host = 'Web3EthereumProvider';
  }
  registerEventListeners() {
    this.connection.on('notification', this.onMessage.bind(this));
    this.connection.on('connect', this.onConnect.bind(this));
    this.connection.on('connect', this.onReady.bind(this));
    this.connection.on('close', this.onClose.bind(this));
    this.connection.on('networkChanged', this.onNetworkChanged.bind(this));
    this.connection.on('accountsChanged', this.onAccountsChanged.bind(this));
  }
  removeAllListeners(event) {
    switch (event) {
      case this.SOCKET_NETWORK_CHANGED:
        this.connection.removeListener('networkChanged', this.onNetworkChanged);
        break;
      case this.SOCKET_ACCOUNTS_CHANGED:
        this.connection.removeListener('accountsChanged', this.onAccountsChanged);
        break;
      case this.SOCKET_MESSAGE:
        this.connection.removeListener('notification', this.onMessage);
        break;
      case this.SOCKET_READY:
        this.connection.removeListener('connect', this.onReady);
        break;
      case this.SOCKET_CLOSE:
        this.connection.removeListener('close', this.onClose);
        break;
      case this.SOCKET_ERROR:
        this.connection.removeListener('close', this.onError);
        break;
      case this.SOCKET_CONNECT:
        this.connection.removeListener('connect', this.onConnect);
        break;
    }
    super.removeAllListeners(event);
  }
  removeAllSocketListeners() {
    this.connection.removeAllListeners();
  }
  onNetworkChanged(networkId) {
    this.emit('networkChanged', networkId);
  }
  onAccountsChanged(accounts) {
    this.emit('accountsChanged', accounts);
  }
  onMessage(response) {
    this.emit(this.getSubscriptionEvent(response.subscription), response);
  }
  async send(method, parameters) {
    const response = this.connection.send(method, parameters);
    const validationResult = JsonRpcResponseValidator.validate(response);
    if (validationResult instanceof Error) {
      throw validationResult;
    }
    return response;
  }
  sendBatch(methods, moduleInstance) {
    let methodCalls = [];
    methods.forEach(method => {
      method.beforeExecution(moduleInstance);
      methodCalls.push(this.connection.send(method.rpcMethod, method.parameters));
    });
    return Promise.all(methodCalls);
  }
}

class MetamaskProvider extends AbstractSocketProvider {
  constructor(inpageProvider) {
    super(inpageProvider, null);
    this.host = 'metamask';
  }
  registerEventListeners() {
    this.connection.on('accountsChanged', this.onAccountsChanged.bind(this));
    this.connection.on('networkChanged', this.onReady.bind(this));
    this.connection.on('networkChanged', this.onNetworkChanged.bind(this));
    this.connection.on('data', this.onMessage.bind(this));
    this.connection.on('error', this.onError.bind(this));
  }
  onMessage(metamaskParam, payload) {
    super.onMessage(payload);
  }
  removeAllListeners(event) {
    switch (event) {
      case this.SOCKET_NETWORK_CHANGED:
        this.connection.removeListener('networkChanged', this.onNetworkChanged);
        break;
      case this.SOCKET_ACCOUNTS_CHANGED:
        this.connection.removeListener('accountsChanged', this.onAccountsChanged);
        break;
      case this.SOCKET_MESSAGE:
        this.connection.removeListener('data', this.onMessage);
        break;
      case this.SOCKET_ERROR:
        this.connection.removeListener('error', this.onError);
        break;
    }
    super.removeAllListeners(event);
  }
  removeAllSocketListeners() {
    this.connection.removeListener(this.SOCKET_NETWORK_CHANGED, this.onNetworkChanged);
    this.connection.removeListener(this.SOCKET_ACCOUNTS_CHANGED, this.onAccountsChanged);
    super.removeAllSocketListeners();
  }
  onNetworkChanged(networkId) {
    this.emit('networkChanged', networkId);
  }
  onAccountsChanged(accounts) {
    this.emit('accountsChanged', accounts);
  }
  disconnect() {
    return true;
  }
  get connected() {
    return this.connection.isConnected();
  }
  sendPayload(payload) {
    return new Promise((resolve, reject) => {
      this.connection.send(payload, (error, response) => {
        this.removeAllListeners(payload.id);
        if (!error) {
          return resolve(response);
        }
        reject(error);
      });
    });
  }
}

class MistEthereumProvider extends AbstractSocketProvider {
  constructor(connection) {
    super(connection, null);
    this.host = 'mist';
  }
  registerEventListeners() {
    this.connection.on('data', this.onMessage.bind(this));
    this.connection.on('error', this.onError.bind(this));
    this.connection.on('connect', this.onConnect.bind(this));
    this.connection.on('connect', this.onReady.bind(this));
    this.connection.on('end', this.onClose.bind(this));
  }
  removeAllListeners(event) {
    switch (event) {
      case this.SOCKET_MESSAGE:
        this.connection.removeListener('data', this.onMessage);
        break;
      case this.SOCKET_ERROR:
        this.connection.removeListener('error', this.onError);
        break;
      case this.SOCKET_CONNECT:
        this.connection.removeListener('connect', this.onConnect);
        break;
      case this.SOCKET_READY:
        this.connection.removeListener('connect', this.onConnect);
        break;
      case this.SOCKET_CLOSE:
        this.connection.removeListener('end', this.onClose);
        break;
    }
    super.removeAllListeners(event);
  }
  disconnect() {
    return true;
  }
  get connected() {
    return this.connection.isConnected();
  }
  sendPayload(payload) {
    return new Promise((resolve, reject) => {
      this.connection.send(payload, (error, response) => {
        this.removeAllListeners(payload.id);
        if (!error) {
          return resolve(response);
        }
        reject(error);
      });
    });
  }
}

class CustomProvider {
  constructor(connection) {
    this.host = 'CustomProvider';
    this.connection = connection;
    this.checkConnectionMethods();
  }
  supportsSubscriptions() {
    return false;
  }
  checkConnectionMethods() {
    if (this.connection.send || this.connection.sendAsync) {
      return true;
    }
    throw new Error('Invalid provider injected!');
  }
  subscribe() {
    throw new Error('Subscriptions are not supported with the CustomProvider.');
  }
  unsubscribe() {
    throw new Error('Subscriptions are not supported with the CustomProvider.');
  }
  async send(method, parameters) {
    const response = await this.sendPayload(JsonRpcMapper.toPayload(method, parameters));
    const validationResult = JsonRpcResponseValidator.validate(response);
    if (validationResult instanceof Error) {
      throw validationResult;
    }
    return response.result;
  }
  sendBatch(methods, moduleInstance) {
    let payload = [];
    methods.forEach(method => {
      method.beforeExecution(moduleInstance);
      payload.push(JsonRpcMapper.toPayload(method.rpcMethod, method.parameters));
    });
    return this.sendPayload(payload);
  }
  sendPayload(payload) {
    return new Promise((resolve, reject) => {
      if (this.connection.sendAsync) {
        this.connection.sendAsync(payload, (error, response) => {
          if (!error) {
            resolve(response);
          }
          reject(error);
        });
        return;
      }
      this.connection.send(payload, (error, response) => {
        if (!error) {
          resolve(response);
        }
        reject(error);
      });
    });
  }
}

class ProvidersModuleFactory {
  createBatchRequest(moduleInstance) {
    return new BatchRequest(moduleInstance);
  }
  createProviderResolver() {
    return new ProviderResolver(this);
  }
  createHttpProvider(url, options = {}) {
    return new HttpProvider(url, options, this);
  }
  createXMLHttpRequest(host, timeout, headers, agent, withCredentials) {
    let request;
    if (typeof process !== 'undefined' && process.versions != null && process.versions.node != null) {
      request = new XMLHttpRequest$1();
      request.nodejsSet(agent);
    } else {
      request = new XMLHttpRequest();
    }
    request.open('POST', host, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.timeout = timeout;
    request.withCredentials = withCredentials;
    if (headers) {
      headers.forEach(header => {
        request.setRequestHeader(header.name, header.value);
      });
    }
    return request;
  }
  createWebsocketProvider(url, options = {}) {
    let connection = '';
    if (typeof process !== 'undefined' && process.versions != null && process.versions.node != null) {
      let headers = options.headers || {};
      const urlObject = new URL(url);
      if (!headers.authorization && urlObject.username && urlObject.password) {
        const authToken = Buffer.from(`${urlObject.username}:${urlObject.password}`).toString('base64');
        headers.authorization = `Basic ${authToken}`;
      }
      connection = new w3cwebsocket(url, options.protocol, null, headers, null, options.clientConfig);
    } else {
      connection = new window.WebSocket(url, options.protocol);
    }
    return new WebsocketProvider(connection, options.timeout);
  }
  createIpcProvider(path, net) {
    return new IpcProvider(net.connect({
      path: path
    }), path);
  }
  createWeb3EthereumProvider(connection) {
    return new Web3EthereumProvider(connection);
  }
  createMetamaskProvider(inpageProvider) {
    return new MetamaskProvider(inpageProvider);
  }
  createMistEthereumProvider(mistEthereumProvider) {
    return new MistEthereumProvider(mistEthereumProvider);
  }
  createCustomProvider(connection) {
    return new CustomProvider(connection);
  }
}

const global$1 = function () {
  return this || typeof self === 'object' && self;
}() || new Function('return this')();
class ProviderDetector {
  static detect() {
    if (typeof global$1.ethereumProvider !== 'undefined' && global$1.ethereumProvider.constructor.name === 'EthereumProvider') {
      return global$1.ethereumProvider;
    }
    if (typeof global$1.web3 !== 'undefined' && global$1.web3.currentProvider) {
      return global$1.web3.currentProvider;
    }
    return null;
  }
}

function HttpProvider$1(url, options = {}) {
  return new ProvidersModuleFactory().createHttpProvider(url, options);
}
function WebsocketProvider$1(url, options = {}) {
  return new ProvidersModuleFactory().createWebsocketProvider(url, options);
}
function IpcProvider$1(path, net) {
  return new ProvidersModuleFactory().createIpcProvider(path, net);
}
function BatchRequest$1(moduleInstance) {
  return new ProvidersModuleFactory().createBatchRequest(moduleInstance);
}
function ProviderResolver$1() {
  return new ProvidersModuleFactory().createProviderResolver();
}

export { BatchRequest$1 as BatchRequest, HttpProvider$1 as HttpProvider, IpcProvider$1 as IpcProvider, ProviderDetector, ProviderResolver$1 as ProviderResolver, ProvidersModuleFactory, Web3EthereumProvider, WebsocketProvider$1 as WebsocketProvider };
