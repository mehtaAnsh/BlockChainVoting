import { AES } from './aes';
export declare class AES_CBC extends AES {
    static encrypt(data: Uint8Array, key: Uint8Array, padding?: boolean, iv?: Uint8Array): Uint8Array;
    static decrypt(data: Uint8Array, key: Uint8Array, padding?: boolean, iv?: Uint8Array): Uint8Array;
    constructor(key: Uint8Array, iv?: Uint8Array, padding?: boolean);
    encrypt(data: Uint8Array): Uint8Array;
    decrypt(data: Uint8Array): Uint8Array;
}
