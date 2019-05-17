import { sha1result } from './sha1/sha1.asm';
import { sha256result } from './sha256/sha256.asm';
import { sha512result } from './sha512/sha512.asm';
export declare abstract class Hash<T extends sha1result | sha256result | sha512result> {
    result: Uint8Array | null;
    pos: number;
    len: number;
    asm: T;
    heap: Uint8Array;
    BLOCK_SIZE: number;
    HASH_SIZE: number;
    reset(): this;
    process(data: Uint8Array): this;
    finish(): this;
}
