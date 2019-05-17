import { BigNumber, Modulus } from '../bignum/bignum';
export declare type key = {
    0: Modulus;
    1: BigNumber;
    2?: BigNumber;
    3?: Modulus;
    4?: Modulus;
    5?: BigNumber;
    6?: BigNumber;
    7?: BigNumber;
};
export declare class RSA {
    readonly key: key;
    result: Uint8Array;
    constructor(key: Uint8Array[]);
    encrypt(msg: BigNumber): this;
    decrypt(msg: BigNumber): this;
}
