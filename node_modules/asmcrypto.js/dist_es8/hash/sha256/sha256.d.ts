import { sha256result } from './sha256.asm';
import { Hash } from '../hash';
export declare const _sha256_block_size = 64;
export declare const _sha256_hash_size = 32;
export declare class Sha256 extends Hash<sha256result> {
    static NAME: string;
    NAME: string;
    BLOCK_SIZE: number;
    HASH_SIZE: number;
    constructor();
}
