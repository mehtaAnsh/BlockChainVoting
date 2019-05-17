import { AES } from './aes';
export declare class AES_CTR extends AES {
    static encrypt(data: Uint8Array, key: Uint8Array, nonce: Uint8Array): Uint8Array;
    static decrypt(data: Uint8Array, key: Uint8Array, nonce: Uint8Array): Uint8Array;
    constructor(key: Uint8Array, nonce: Uint8Array);
    encrypt(data: Uint8Array): Uint8Array;
    decrypt(data: Uint8Array): Uint8Array;
    private AES_CTR_set_options;
}
