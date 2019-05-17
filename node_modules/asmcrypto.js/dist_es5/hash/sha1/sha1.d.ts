import { sha1result } from './sha1.asm';
import { Hash } from '../hash';
export declare const _sha1_block_size = 64;
export declare const _sha1_hash_size = 20;
export declare class Sha1 extends Hash<sha1result> {
    static NAME: string;
    NAME: string;
    BLOCK_SIZE: number;
    HASH_SIZE: number;
    constructor();
}
