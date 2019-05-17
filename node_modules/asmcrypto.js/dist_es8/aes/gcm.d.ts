import { AES } from './aes';
export declare class AES_GCM extends AES {
    private readonly tagSize;
    private readonly adata;
    private readonly gamma0;
    private counter;
    static encrypt(cleartext: Uint8Array, key: Uint8Array, nonce: Uint8Array, adata?: Uint8Array, tagsize?: number): Uint8Array;
    static decrypt(ciphertext: Uint8Array, key: Uint8Array, nonce: Uint8Array, adata?: Uint8Array, tagsize?: number): Uint8Array;
    constructor(key: Uint8Array, nonce: Uint8Array, adata?: Uint8Array, tagSize?: number);
    encrypt(data: Uint8Array): Uint8Array;
    decrypt(data: Uint8Array): Uint8Array;
    AES_GCM_Encrypt_process(data: Uint8Array): Uint8Array;
    AES_GCM_Encrypt_finish(): Uint8Array;
    AES_GCM_Decrypt_process(data: Uint8Array): Uint8Array;
    AES_GCM_Decrypt_finish(): Uint8Array;
    private AES_GCM_decrypt;
    private AES_GCM_encrypt;
    _gcm_mac_process(data: Uint8Array): void;
}
