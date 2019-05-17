import { sha256_asm } from './sha256.asm';
import { Hash } from '../hash';
import { _heap_init } from '../../other/utils';
export const _sha256_block_size = 64;
export const _sha256_hash_size = 32;
export class Sha256 extends Hash {
    constructor() {
        super();
        this.NAME = 'sha256';
        this.BLOCK_SIZE = _sha256_block_size;
        this.HASH_SIZE = _sha256_hash_size;
        this.heap = _heap_init();
        this.asm = sha256_asm({ Uint8Array: Uint8Array }, null, this.heap.buffer);
        this.reset();
    }
}
Sha256.NAME = 'sha256';
