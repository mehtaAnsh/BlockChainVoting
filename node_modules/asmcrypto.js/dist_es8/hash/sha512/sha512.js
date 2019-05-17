import { sha512_asm } from './sha512.asm';
import { Hash } from '../hash';
import { _heap_init } from '../../other/utils';
export const _sha512_block_size = 128;
export const _sha512_hash_size = 64;
export class Sha512 extends Hash {
    constructor() {
        super();
        this.NAME = 'sha512';
        this.BLOCK_SIZE = _sha512_block_size;
        this.HASH_SIZE = _sha512_hash_size;
        this.heap = _heap_init();
        this.asm = sha512_asm({ Uint8Array: Uint8Array }, null, this.heap.buffer);
        this.reset();
    }
}
Sha512.NAME = 'sha512';
