/**
 * Counter with CBC-MAC (CCM)
 *
 * Due to JS limitations (52 bits of Number precision) maximum encrypted message length
 * is limited to ~4 PiB ( 2^52 - 16 ) per `nonce`-`key` pair.
 * That also limits `lengthSize` parameter maximum value to 7 (not 8 as described in RFC3610).
 *
 * Additional authenticated data `adata` maximum length is chosen to be no more than 65279 bytes ( 2^16 - 2^8 ),
 * which is considered enough for the most of use-cases.
 *
 * And one more important thing: in case of progressive ciphering of a data stream (in other
 * words when data can't be held in-memory at a whole and are ciphered chunk-by-chunk)
 * you have to know the `dataLength` in advance and pass that value to the cipher options.
 */
import { AES } from './aes';
export declare class AES_CCM extends AES {
    private readonly tagSize;
    private readonly lengthSize;
    private nonce;
    private readonly adata;
    private counter;
    private dataLength;
    static encrypt(clear: Uint8Array, key: Uint8Array, nonce: Uint8Array, adata: Uint8Array | undefined, tagsize?: number): Uint8Array;
    static decrypt(cipher: Uint8Array, key: Uint8Array, nonce: Uint8Array, adata: Uint8Array | undefined, tagsize?: number): Uint8Array;
    constructor(key: Uint8Array, nonce: Uint8Array, adata: Uint8Array | undefined, tagSize: number | undefined, dataLength: number);
    encrypt(data: Uint8Array): Uint8Array;
    decrypt(data: Uint8Array): Uint8Array;
    AES_CCM_calculate_iv(): void;
    _cbc_mac_process(data: Uint8Array): void;
    AES_CCM_Encrypt_process(data: Uint8Array): Uint8Array;
    AES_CCM_Encrypt_finish(): Uint8Array;
    AES_CCM_Decrypt_process(data: Uint8Array): Uint8Array;
    AES_CCM_Decrypt_finish(): Uint8Array;
    private AES_CTR_set_options;
}
