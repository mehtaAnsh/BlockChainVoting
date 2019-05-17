/// <reference types="node" />
import BN = require('bn.js');
export declare type Input = Buffer | string | number | Uint8Array | BN | Dictionary | List | null;
export interface List extends Array<Input> {
}
export interface Dictionary {
    [x: string]: Input;
}
export interface Decoded {
    data: Buffer | Buffer[];
    remainder: Buffer;
}
