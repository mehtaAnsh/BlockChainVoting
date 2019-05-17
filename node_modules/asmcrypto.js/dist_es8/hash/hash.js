import { _heap_write } from '../other/utils';
import { IllegalStateError } from '../other/errors';
export class Hash {
    constructor() {
        this.pos = 0;
        this.len = 0;
    }
    reset() {
        this.result = null;
        this.pos = 0;
        this.len = 0;
        this.asm.reset();
        return this;
    }
    process(data) {
        if (this.result !== null)
            throw new IllegalStateError('state must be reset before processing new data');
        let asm = this.asm;
        let heap = this.heap;
        let hpos = this.pos;
        let hlen = this.len;
        let dpos = 0;
        let dlen = data.length;
        let wlen = 0;
        while (dlen > 0) {
            wlen = _heap_write(heap, hpos + hlen, data, dpos, dlen);
            hlen += wlen;
            dpos += wlen;
            dlen -= wlen;
            wlen = asm.process(hpos, hlen);
            hpos += wlen;
            hlen -= wlen;
            if (!hlen)
                hpos = 0;
        }
        this.pos = hpos;
        this.len = hlen;
        return this;
    }
    finish() {
        if (this.result !== null)
            throw new IllegalStateError('state must be reset before processing new data');
        this.asm.finish(this.pos, this.len, 0);
        this.result = new Uint8Array(this.HASH_SIZE);
        this.result.set(this.heap.subarray(0, this.HASH_SIZE));
        this.pos = 0;
        this.len = 0;
        return this;
    }
}
