var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { IllegalArgumentError, IllegalStateError, SecurityError } from '../other/errors';
import { _heap_write } from '../other/utils';
import { AES } from './aes';
import { AES_asm } from './aes.asm';
var _AES_GCM_data_maxLength = 68719476704; // 2^36 - 2^5
var AES_GCM = /** @class */ (function (_super) {
    __extends(AES_GCM, _super);
    function AES_GCM(key, nonce, adata, tagSize) {
        if (tagSize === void 0) { tagSize = 16; }
        var _this = _super.call(this, key, undefined, false, 'CTR') || this;
        _this.tagSize = tagSize;
        _this.gamma0 = 0;
        _this.counter = 1;
        // Init GCM
        _this.asm.gcm_init();
        // Tag size
        if (_this.tagSize < 4 || _this.tagSize > 16)
            throw new IllegalArgumentError('illegal tagSize value');
        // Nonce
        var noncelen = nonce.length || 0;
        var noncebuf = new Uint8Array(16);
        if (noncelen !== 12) {
            _this._gcm_mac_process(nonce);
            _this.heap[0] = 0;
            _this.heap[1] = 0;
            _this.heap[2] = 0;
            _this.heap[3] = 0;
            _this.heap[4] = 0;
            _this.heap[5] = 0;
            _this.heap[6] = 0;
            _this.heap[7] = 0;
            _this.heap[8] = 0;
            _this.heap[9] = 0;
            _this.heap[10] = 0;
            _this.heap[11] = noncelen >>> 29;
            _this.heap[12] = (noncelen >>> 21) & 255;
            _this.heap[13] = (noncelen >>> 13) & 255;
            _this.heap[14] = (noncelen >>> 5) & 255;
            _this.heap[15] = (noncelen << 3) & 255;
            _this.asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA, 16);
            _this.asm.get_iv(AES_asm.HEAP_DATA);
            _this.asm.set_iv(0, 0, 0, 0);
            noncebuf.set(_this.heap.subarray(0, 16));
        }
        else {
            noncebuf.set(nonce);
            noncebuf[15] = 1;
        }
        var nonceview = new DataView(noncebuf.buffer);
        _this.gamma0 = nonceview.getUint32(12);
        _this.asm.set_nonce(nonceview.getUint32(0), nonceview.getUint32(4), nonceview.getUint32(8), 0);
        _this.asm.set_mask(0, 0, 0, 0xffffffff);
        // Associated data
        if (adata !== undefined) {
            if (adata.length > _AES_GCM_data_maxLength)
                throw new IllegalArgumentError('illegal adata length');
            if (adata.length) {
                _this.adata = adata;
                _this._gcm_mac_process(adata);
            }
            else {
                _this.adata = undefined;
            }
        }
        else {
            _this.adata = undefined;
        }
        // Counter
        if (_this.counter < 1 || _this.counter > 0xffffffff)
            throw new RangeError('counter must be a positive 32-bit integer');
        _this.asm.set_counter(0, 0, 0, (_this.gamma0 + _this.counter) | 0);
        return _this;
    }
    AES_GCM.encrypt = function (cleartext, key, nonce, adata, tagsize) {
        return new AES_GCM(key, nonce, adata, tagsize).encrypt(cleartext);
    };
    AES_GCM.decrypt = function (ciphertext, key, nonce, adata, tagsize) {
        return new AES_GCM(key, nonce, adata, tagsize).decrypt(ciphertext);
    };
    AES_GCM.prototype.encrypt = function (data) {
        return this.AES_GCM_encrypt(data);
    };
    AES_GCM.prototype.decrypt = function (data) {
        return this.AES_GCM_decrypt(data);
    };
    AES_GCM.prototype.AES_GCM_Encrypt_process = function (data) {
        var dpos = 0;
        var dlen = data.length || 0;
        var asm = this.asm;
        var heap = this.heap;
        var counter = this.counter;
        var pos = this.pos;
        var len = this.len;
        var rpos = 0;
        var rlen = (len + dlen) & -16;
        var wlen = 0;
        if (((counter - 1) << 4) + len + dlen > _AES_GCM_data_maxLength)
            throw new RangeError('counter overflow');
        var result = new Uint8Array(rlen);
        while (dlen > 0) {
            wlen = _heap_write(heap, pos + len, data, dpos, dlen);
            len += wlen;
            dpos += wlen;
            dlen -= wlen;
            wlen = asm.cipher(AES_asm.ENC.CTR, AES_asm.HEAP_DATA + pos, len);
            wlen = asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA + pos, wlen);
            if (wlen)
                result.set(heap.subarray(pos, pos + wlen), rpos);
            counter += wlen >>> 4;
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
        this.counter = counter;
        this.pos = pos;
        this.len = len;
        return result;
    };
    AES_GCM.prototype.AES_GCM_Encrypt_finish = function () {
        var asm = this.asm;
        var heap = this.heap;
        var counter = this.counter;
        var tagSize = this.tagSize;
        var adata = this.adata;
        var pos = this.pos;
        var len = this.len;
        var result = new Uint8Array(len + tagSize);
        asm.cipher(AES_asm.ENC.CTR, AES_asm.HEAP_DATA + pos, (len + 15) & -16);
        if (len)
            result.set(heap.subarray(pos, pos + len));
        var i = len;
        for (; i & 15; i++)
            heap[pos + i] = 0;
        asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA + pos, i);
        var alen = adata !== undefined ? adata.length : 0;
        var clen = ((counter - 1) << 4) + len;
        heap[0] = 0;
        heap[1] = 0;
        heap[2] = 0;
        heap[3] = alen >>> 29;
        heap[4] = alen >>> 21;
        heap[5] = (alen >>> 13) & 255;
        heap[6] = (alen >>> 5) & 255;
        heap[7] = (alen << 3) & 255;
        heap[8] = heap[9] = heap[10] = 0;
        heap[11] = clen >>> 29;
        heap[12] = (clen >>> 21) & 255;
        heap[13] = (clen >>> 13) & 255;
        heap[14] = (clen >>> 5) & 255;
        heap[15] = (clen << 3) & 255;
        asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA, 16);
        asm.get_iv(AES_asm.HEAP_DATA);
        asm.set_counter(0, 0, 0, this.gamma0);
        asm.cipher(AES_asm.ENC.CTR, AES_asm.HEAP_DATA, 16);
        result.set(heap.subarray(0, tagSize), len);
        this.counter = 1;
        this.pos = 0;
        this.len = 0;
        return result;
    };
    AES_GCM.prototype.AES_GCM_Decrypt_process = function (data) {
        var dpos = 0;
        var dlen = data.length || 0;
        var asm = this.asm;
        var heap = this.heap;
        var counter = this.counter;
        var tagSize = this.tagSize;
        var pos = this.pos;
        var len = this.len;
        var rpos = 0;
        var rlen = len + dlen > tagSize ? (len + dlen - tagSize) & -16 : 0;
        var tlen = len + dlen - rlen;
        var wlen = 0;
        if (((counter - 1) << 4) + len + dlen > _AES_GCM_data_maxLength)
            throw new RangeError('counter overflow');
        var result = new Uint8Array(rlen);
        while (dlen > tlen) {
            wlen = _heap_write(heap, pos + len, data, dpos, dlen - tlen);
            len += wlen;
            dpos += wlen;
            dlen -= wlen;
            wlen = asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA + pos, wlen);
            wlen = asm.cipher(AES_asm.DEC.CTR, AES_asm.HEAP_DATA + pos, wlen);
            if (wlen)
                result.set(heap.subarray(pos, pos + wlen), rpos);
            counter += wlen >>> 4;
            rpos += wlen;
            pos = 0;
            len = 0;
        }
        if (dlen > 0) {
            len += _heap_write(heap, 0, data, dpos, dlen);
        }
        this.counter = counter;
        this.pos = pos;
        this.len = len;
        return result;
    };
    AES_GCM.prototype.AES_GCM_Decrypt_finish = function () {
        var asm = this.asm;
        var heap = this.heap;
        var tagSize = this.tagSize;
        var adata = this.adata;
        var counter = this.counter;
        var pos = this.pos;
        var len = this.len;
        var rlen = len - tagSize;
        if (len < tagSize)
            throw new IllegalStateError('authentication tag not found');
        var result = new Uint8Array(rlen);
        var atag = new Uint8Array(heap.subarray(pos + rlen, pos + len));
        var i = rlen;
        for (; i & 15; i++)
            heap[pos + i] = 0;
        asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA + pos, i);
        asm.cipher(AES_asm.DEC.CTR, AES_asm.HEAP_DATA + pos, i);
        if (rlen)
            result.set(heap.subarray(pos, pos + rlen));
        var alen = adata !== undefined ? adata.length : 0;
        var clen = ((counter - 1) << 4) + len - tagSize;
        heap[0] = 0;
        heap[1] = 0;
        heap[2] = 0;
        heap[3] = alen >>> 29;
        heap[4] = alen >>> 21;
        heap[5] = (alen >>> 13) & 255;
        heap[6] = (alen >>> 5) & 255;
        heap[7] = (alen << 3) & 255;
        heap[8] = heap[9] = heap[10] = 0;
        heap[11] = clen >>> 29;
        heap[12] = (clen >>> 21) & 255;
        heap[13] = (clen >>> 13) & 255;
        heap[14] = (clen >>> 5) & 255;
        heap[15] = (clen << 3) & 255;
        asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA, 16);
        asm.get_iv(AES_asm.HEAP_DATA);
        asm.set_counter(0, 0, 0, this.gamma0);
        asm.cipher(AES_asm.ENC.CTR, AES_asm.HEAP_DATA, 16);
        var acheck = 0;
        for (var i_1 = 0; i_1 < tagSize; ++i_1)
            acheck |= atag[i_1] ^ heap[i_1];
        if (acheck)
            throw new SecurityError('data integrity check failed');
        this.counter = 1;
        this.pos = 0;
        this.len = 0;
        return result;
    };
    AES_GCM.prototype.AES_GCM_decrypt = function (data) {
        var result1 = this.AES_GCM_Decrypt_process(data);
        var result2 = this.AES_GCM_Decrypt_finish();
        var result = new Uint8Array(result1.length + result2.length);
        if (result1.length)
            result.set(result1);
        if (result2.length)
            result.set(result2, result1.length);
        return result;
    };
    AES_GCM.prototype.AES_GCM_encrypt = function (data) {
        var result1 = this.AES_GCM_Encrypt_process(data);
        var result2 = this.AES_GCM_Encrypt_finish();
        var result = new Uint8Array(result1.length + result2.length);
        if (result1.length)
            result.set(result1);
        if (result2.length)
            result.set(result2, result1.length);
        return result;
    };
    AES_GCM.prototype._gcm_mac_process = function (data) {
        var heap = this.heap;
        var asm = this.asm;
        var dpos = 0;
        var dlen = data.length || 0;
        var wlen = 0;
        while (dlen > 0) {
            wlen = _heap_write(heap, 0, data, dpos, dlen);
            dpos += wlen;
            dlen -= wlen;
            while (wlen & 15)
                heap[wlen++] = 0;
            asm.mac(AES_asm.MAC.GCM, AES_asm.HEAP_DATA, wlen);
        }
    };
    return AES_GCM;
}(AES));
export { AES_GCM };
