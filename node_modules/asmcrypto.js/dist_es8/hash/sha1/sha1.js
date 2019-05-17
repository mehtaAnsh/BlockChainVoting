import { sha1_asm } from './sha1.asm';
import { Hash } from '../hash';
import { _heap_init } from '../../other/utils';
export const _sha1_block_size = 64;
export const _sha1_hash_size = 20;
export class Sha1 extends Hash {
    constructor() {
        super();
        this.NAME = 'sha1';
        this.BLOCK_SIZE = _sha1_block_size;
        this.HASH_SIZE = _sha1_hash_size;
        this.heap = _heap_init();
        this.asm = sha1_asm({ Uint8Array: Uint8Array }, null, this.heap.buffer);
        this.reset();
    }
}
Sha1.NAME = 'sha1';
