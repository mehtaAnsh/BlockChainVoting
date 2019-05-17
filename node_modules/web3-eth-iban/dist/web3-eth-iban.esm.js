import { isAddress, toChecksumAddress } from 'web3-utils';
import BigNumber from 'bn.js';

const leftPad = (string, bytes) => {
  let result = string;
  while (result.length < bytes * 2) {
    result = `0${result}`;
  }
  return result;
};
const iso13616Prepare = iban => {
  const A = 'A'.charCodeAt(0);
  const Z = 'Z'.charCodeAt(0);
  iban = iban.toUpperCase();
  iban = iban.substr(4) + iban.substr(0, 4);
  return iban.split('').map(n => {
    const code = n.charCodeAt(0);
    if (code >= A && code <= Z) {
      return code - A + 10;
    } else {
      return n;
    }
  }).join('');
};
const module9710 = iban => {
  let remainder = iban;
  let block;
  while (remainder.length > 2) {
    block = remainder.slice(0, 9);
    remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
  }
  return parseInt(remainder, 10) % 97;
};
class Iban {
  constructor(iban) {
    this._iban = iban;
  }
  static toAddress(iban) {
    iban = new Iban(iban);
    if (!iban.isDirect()) {
      throw new Error("IBAN is indirect and can't be converted");
    }
    return iban.toAddress();
  }
  static toIban(address) {
    return Iban.fromAddress(address).toString();
  }
  static fromAddress(address) {
    if (!isAddress(address)) {
      throw new Error(`Provided address is not a valid address: ${address}`);
    }
    address = address.replace('0x', '').replace('0X', '');
    const asBn = new BigNumber(address, 16);
    const base36 = asBn.toString(36);
    const padded = leftPad(base36, 15);
    return Iban.fromBban(padded.toUpperCase());
  }
  static fromBban(bban) {
    const countryCode = 'XE';
    const remainder = module9710(iso13616Prepare(`${countryCode}00${bban}`));
    const checkDigit = `0${98 - remainder}`.slice(-2);
    return new Iban(countryCode + checkDigit + bban);
  }
  static createIndirect(options) {
    return Iban.fromBban(`ETH${options.institution}${options.identifier}`);
  }
  static isValid(iban) {
    const i = new Iban(iban);
    return i.isValid();
  }
  isValid() {
    return /^XE\d{2}(ETH[0-9A-Z]{13}|[0-9A-Z]{30,31})$/.test(this._iban) && module9710(iso13616Prepare(this._iban)) === 1;
  }
  isDirect() {
    return this._iban.length === 34 || this._iban.length === 35;
  }
  isIndirect() {
    return this._iban.length === 20;
  }
  checksum() {
    return this._iban.substr(2, 2);
  }
  institution() {
    return this.isIndirect() ? this._iban.substr(7, 4) : '';
  }
  client() {
    return this.isIndirect() ? this._iban.substr(11) : '';
  }
  toAddress() {
    if (this.isDirect()) {
      const base36 = this._iban.substr(4);
      const asBn = new BigNumber(base36, 36);
      return toChecksumAddress(asBn.toString(16, 20));
    }
    return '';
  }
  toString() {
    return this._iban;
  }
}

export { Iban };
