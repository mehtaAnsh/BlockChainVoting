import { AES_asm, AES_mode } from './aes.asm';
export declare abstract class AES {
    protected readonly heap: Uint8Array;
    protected readonly asm: AES_asm;
    private readonly mode;
    protected padding: boolean;
    protected pos: number;
    protected len: number;
    protected constructor(key: Uint8Array, iv: Uint8Array | undefined, padding: boolean | undefined, mode: AES_mode);
    AES_Encrypt_process(data: Uint8Array): Uint8Array;
    AES_Encrypt_finish(): Uint8Array;
    AES_Decrypt_process(data: Uint8Array): Uint8Array;
    AES_Decrypt_finish(): Uint8Array;
}
