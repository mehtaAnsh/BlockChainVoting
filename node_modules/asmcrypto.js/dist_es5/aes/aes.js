import { AES_asm } from './aes.asm';
import { _heap_init, _heap_write, is_bytes } from '../other/utils';
import { IllegalArgumentError, SecurityError } from '../other/errors';
var AES = /** @class */ (function () {
    function AES(key, iv, padding, mode) {
        if (padding === void 0) { padding = true; }
        this.pos = 0;
        this.len = 0;
        this.mode = mode;
        // The AES "worker"
        this.heap = _heap_init().subarray(AES_asm.HEAP_DATA);
        this.asm = new AES_asm(null, this.heap.buffer);
        // The AES object state
        this.pos = 0;
        this.len = 0;
        // Key
        var keylen = key.length;
        if (keylen !== 16 && keylen !== 24 && keylen !== 32)
            throw new IllegalArgumentError('illegal key size');
        var keyview = new DataView(key.buffer, key.byteOffset, key.byteLength);
        this.asm.set_key(keylen >> 2, keyview.getUint32(0), keyview.getUint32(4), keyview.getUint32(8), keyview.getUint32(12), keylen > 16 ? keyview.getUint32(16) : 0, keylen > 16 ? keyview.getUint32(20) : 0, keylen > 24 ? keyview.getUint32(24) : 0, keylen > 24 ? keyview.getUint32(28) : 0);
        // IV
        if (iv !== undefined) {
            if (iv.length !== 16)
                throw new IllegalArgumentError('illegal iv size');
            var ivview = new DataView(iv.buffer, iv.byteOffset, iv.byteLength);
            this.asm.set_iv(ivview.getUint32(0), ivview.getUint32(4), ivview.getUint32(8), ivview.getUint32(12));
        }
        else {
            this.asm.set_iv(0, 0, 0, 0);
        }
        this.padding = padding;
    }
    AES.prototype.AES_Encrypt_process = function (data) {
        if (!is_bytes(data))
            throw new TypeError("data isn't of expected type");
        var asm = this.asm;
        var heap = this.heap;
        var amode = AES_asm.ENC[this.mode];
        var hpos = AES_asm.HEAP_DATA;
        var pos = this.pos;
        var len = this.len;
        var dpos = 0;
        var dlen = data.length || 0;
        var rpos = 0;
        var rlen = (len + dlen) & -16;
        var wlen = 0;
        var result = new Uint8Array(rlen);
        while (dlen > 0) {
            wlen = _heap_write(heap, pos + len, data, dpos, dlen);
            len += wlen;
            dpos += wlen;
            dlen -= wlen;
            wlen = asm.cipher(amode, hpos + pos, len);
            if (wlen)
                result.set(heap.subarray(pos, pos + wlen), rpos);
            rpos += wlen;
            if (wlen < len) {
                pos += wlen;
                len -= wlen;
            }
            else {
                pos = 0;
                len = 0;
            }
        }
        this.pos = pos;
        this.len = len;
        return result;
    };
    AES.prototype.AES_Encrypt_finish = function () {
        var asm = this.asm;
        var heap = this.heap;
        var amode = AES_asm.ENC[this.mode];
        var hpos = AES_asm.HEAP_DATA;
        var pos = this.pos;
        var len = this.len;
        var plen = 16 - (len % 16);
        var rlen = len;
        if (this.hasOwnProperty('padding')) {
            if (this.padding) {
                for (var p = 0; p < plen; ++p) {
                    heap[pos + len + p] = plen;
                }
                len += plen;
                rlen = len;
            }
            else if (len % 16) {
                throw new IllegalArgumentError('data length must be a multiple of the block size');
            }
        }
        else {
            len += plen;
        }
        var result = new Uint8Array(rlen);
        if (len)
            asm.cipher(amode, hpos + pos, len);
        if (rlen)
            result.set(heap.subarray(pos, pos + rlen));
        this.pos = 0;
        this.len = 0;
        return result;
    };
    AES.prototype.AES_Decrypt_process = function (data) {
        if (!is_bytes(data))
            throw new TypeError("data isn't of expected type");
        var asm = this.asm;
        var heap = this.heap;
        var amode = AES_asm.DEC[this.mode];
        var hpos = AES_asm.HEAP_DATA;
        var pos = this.pos;
        var len = this.len;
        var dpos = 0;
        var dlen = data.length || 0;
        var rpos = 0;
        var rlen = (len + dlen) & -16;
        var plen = 0;
        var wlen = 0;
        if (this.padding) {
            plen = len + dlen - rlen || 16;
            rlen -= plen;
        }
        var result = new Uint8Array(rlen);
        while (dlen > 0) {
            wlen = _heap_write(heap, pos + len, data, dpos, dlen);
            len += wlen;
            dpos += wlen;
            dlen -= wlen;
            wlen = asm.cipher(amode, hpos + pos, len - (!dlen ? plen : 0));
            if (wlen)
                result.set(heap.subarray(pos, pos + wlen), rpos);
            rpos += wlen;
            if (wlen < len) {
                pos += wlen;
                len -= wlen;
            }
            else {
                pos = 0;
                len = 0;
            }
        }
        this.pos = pos;
        this.len = len;
        return result;
    };
    AES.prototype.AES_Decrypt_finish = function () {
        var asm = this.asm;
        var heap = this.heap;
        var amode = AES_asm.DEC[this.mode];
        var hpos = AES_asm.HEAP_DATA;
        var pos = this.pos;
        var len = this.len;
        var rlen = len;
        if (len > 0) {
            if (len % 16) {
                if (this.hasOwnProperty('padding')) {
                    throw new IllegalArgumentError('data length must be a multiple of the block size');
                }
                else {
                    len += 16 - (len % 16);
                }
            }
            asm.cipher(amode, hpos + pos, len);
            if (this.hasOwnProperty('padding') && this.padding) {
                var pad = heap[pos + rlen - 1];
                if (pad < 1 || pad > 16 || pad > rlen)
                    throw new SecurityError('bad padding');
                var pcheck = 0;
                for (var i = pad; i > 1; i--)
                    pcheck |= pad ^ heap[pos + rlen - i];
                if (pcheck)
                    throw new SecurityError('bad padding');
                rlen -= pad;
            }
        }
        var result = new Uint8Array(rlen);
        if (rlen > 0) {
            result.set(heap.subarray(pos, pos + rlen));
        }
        this.pos = 0;
        this.len = 0;
        return result;
    };
    return AES;
}());
export { AES };
