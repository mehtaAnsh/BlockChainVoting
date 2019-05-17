/**
 * Counter with CBC-MAC (CCM)
 *
 * Due to JS limitations (52 bits of Number precision) maximum encrypted message length
 * is limited to ~4 PiB ( 2^52 - 16 ) per `nonce`-`key` pair.
 * That also limits `lengthSize` parameter maximum value to 7 (not 8 as described in RFC3610).
 *
 * Additional authenticated data `adata` maximum length is chosen to be no more than 65279 bytes ( 2^16 - 2^8 ),
 * which is considered enough for the most of use-cases.
 *
 * And one more important thing: in case of progressive ciphering of a data stream (in other
 * words when data can't be held in-memory at a whole and are ciphered chunk-by-chunk)
 * you have to know the `dataLength` in advance and pass that value to the cipher options.
 */
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
import { AES_asm } from './aes.asm';
import { AES } from './aes';
import { _heap_write } from '../other/utils';
import { IllegalArgumentError, IllegalStateError, SecurityError } from '../other/errors';
var _AES_CCM_adata_maxLength = 65279; // 2^16 - 2^8
var _AES_CCM_data_maxLength = 4503599627370480; // 2^52 - 2^4
var AES_CCM = /** @class */ (function (_super) {
    __extends(AES_CCM, _super);
    function AES_CCM(key, nonce, adata, tagSize, dataLength) {
        if (tagSize === void 0) { tagSize = 16; }
        var _this = _super.call(this, key, undefined, undefined, 'CCM') || this;
        _this.counter = 1;
        _this.dataLength = -1;
        // Tag size
        if (tagSize < 4 || tagSize > 16 || tagSize & 1)
            throw new IllegalArgumentError('illegal tagSize value');
        _this.tagSize = tagSize;
        // Nonce
        _this.nonce = nonce;
        if (nonce.length < 8 || nonce.length > 13)
            throw new IllegalArgumentError('illegal nonce length');
        _this.lengthSize = 15 - nonce.length;
        nonce = new Uint8Array(nonce.length + 1);
        nonce[0] = _this.lengthSize - 1;
        nonce.set(_this.nonce, 1);
        if (dataLength < 0 || dataLength > _AES_CCM_data_maxLength || dataLength > Math.pow(2, 8 * _this.lengthSize) - 16)
            throw new IllegalArgumentError('illegal dataLength value');
        if (adata !== undefined) {
            if (adata.length > _AES_CCM_adata_maxLength)
                throw new IllegalArgumentError('illegal adata length');
            _this.adata = adata.length ? adata : undefined;
        }
        _this.dataLength = dataLength;
        _this.counter = 1;
        _this.AES_CCM_calculate_iv();
        _this.AES_CTR_set_options(nonce, _this.counter, 8 * _this.lengthSize);
        return _this;
    }
    AES_CCM.encrypt = function (clear, key, nonce, adata, tagsize) {
        if (tagsize === void 0) { tagsize = 16; }
        return new AES_CCM(key, nonce, adata, tagsize, clear.length).encrypt(clear);
    };
    AES_CCM.decrypt = function (cipher, key, nonce, adata, tagsize) {
        if (tagsize === void 0) { tagsize = 16; }
        return new AES_CCM(key, nonce, adata, tagsize, cipher.length - tagsize).decrypt(cipher);
    };
    AES_CCM.prototype.encrypt = function (data) {
        this.dataLength = data.length || 0;
        var result1 = this.AES_CCM_Encrypt_process(data);
        var result2 = this.AES_CCM_Encrypt_finish();
        var result = new Uint8Array(result1.length + result2.length);
        if (result1.length)
            result.set(result1);
        if (result2.length)
            result.set(result2, result1.length);
        return result;
    };
    AES_CCM.prototype.decrypt = function (data) {
        this.dataLength = data.length || 0;
        var result1 = this.AES_CCM_Decrypt_process(data);
        var result2 = this.AES_CCM_Decrypt_finish();
        var result = new Uint8Array(result1.length + result2.length);
        if (result1.length)
            result.set(result1);
        if (result2.length)
            result.set(result2, result1.length);
        return result;
    };
    AES_CCM.prototype.AES_CCM_calculate_iv = function () {
        var nonce = this.nonce;
        var adata = this.adata;
        var tagSize = this.tagSize;
        var lengthSize = this.lengthSize;
        var dataLength = this.dataLength;
        var data = new Uint8Array(16 + (adata ? 2 + adata.length : 0));
        // B0: flags(adata?, M', L'), nonce, len(data)
        data[0] = (adata ? 64 : 0) | ((tagSize - 2) << 2) | (lengthSize - 1);
        data.set(nonce, 1);
        if (lengthSize > 6)
            data[9] = ((dataLength / 0x100000000) >>> 16) & 15;
        if (lengthSize > 5)
            data[10] = ((dataLength / 0x100000000) >>> 8) & 255;
        if (lengthSize > 4)
            data[11] = (dataLength / 0x100000000) & 255;
        if (lengthSize > 3)
            data[12] = dataLength >>> 24;
        if (lengthSize > 2)
            data[13] = (dataLength >>> 16) & 255;
        data[14] = (dataLength >>> 8) & 255;
        data[15] = dataLength & 255;
        // B*: len(adata), adata
        if (adata) {
            data[16] = (adata.length >>> 8) & 255;
            data[17] = adata.length & 255;
            data.set(adata, 18);
        }
        this._cbc_mac_process(data);
        this.asm.get_state(AES_asm.HEAP_DATA);
        var iv = new Uint8Array(this.heap.subarray(0, 16));
        var ivview = new DataView(iv.buffer, iv.byteOffset, iv.byteLength);
        this.asm.set_iv(ivview.getUint32(0), ivview.getUint32(4), ivview.getUint32(8), ivview.getUint32(12));
    };
    AES_CCM.prototype._cbc_mac_process = function (data) {
        var heap = this.heap;
        var asm = this.asm;
        var dpos = 0;
        var dlen = data.length || 0;
        var wlen = 0;
        while (dlen > 0) {
            wlen = _heap_write(heap, 0, data, dpos, dlen);
            while (wlen & 15)
                heap[wlen++] = 0;
            dpos += wlen;
            dlen -= wlen;
            asm.mac(AES_asm.MAC.CBC, AES_asm.HEAP_DATA, wlen);
        }
    };
    AES_CCM.prototype.AES_CCM_Encrypt_process = function (data) {
        var asm = this.asm;
        var heap = this.heap;
        var dpos = 0;
        var dlen = data.length || 0;
        var counter = this.counter;
        var pos = this.pos;
        var len = this.len;
        var rlen = (len + dlen) & -16;
        var rpos = 0;
        var wlen = 0;
        if (((counter - 1) << 4) + len + dlen > _AES_CCM_data_maxLength)
            // ??? should check against lengthSize
            throw new RangeError('counter overflow');
        var result = new Uint8Array(rlen);
        while (dlen > 0) {
            wlen = _heap_write(heap, pos + len, data, dpos, dlen);
            len += wlen;
            dpos += wlen;
            dlen -= wlen;
            wlen = asm.mac(AES_asm.MAC.CBC, AES_asm.HEAP_DATA + pos, len);
            wlen = asm.cipher(AES_asm.ENC.CTR, AES_asm.HEAP_DATA + pos, wlen);
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
    AES_CCM.prototype.AES_CCM_Encrypt_finish = function () {
        var asm = this.asm;
        var heap = this.heap;
        var tagSize = this.tagSize;
        var pos = this.pos;
        var len = this.len;
        var result = new Uint8Array(len + tagSize);
        var i = len;
        for (; i & 15; i++)
            heap[pos + i] = 0;
        asm.mac(AES_asm.MAC.CBC, AES_asm.HEAP_DATA + pos, i);
        asm.cipher(AES_asm.ENC.CTR, AES_asm.HEAP_DATA + pos, i);
        if (len)
            result.set(heap.subarray(pos, pos + len));
        asm.set_counter(0, 0, 0, 0);
        asm.get_iv(AES_asm.HEAP_DATA);
        asm.cipher(AES_asm.ENC.CTR, AES_asm.HEAP_DATA, 16);
        result.set(heap.subarray(0, tagSize), len);
        this.counter = 1;
        this.pos = 0;
        this.len = 0;
        return result;
    };
    AES_CCM.prototype.AES_CCM_Decrypt_process = function (data) {
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
        if (((counter - 1) << 4) + len + dlen > _AES_CCM_data_maxLength)
            throw new RangeError('counter overflow');
        var result = new Uint8Array(rlen);
        while (dlen > tlen) {
            wlen = _heap_write(heap, pos + len, data, dpos, dlen - tlen);
            len += wlen;
            dpos += wlen;
            dlen -= wlen;
            wlen = asm.cipher(AES_asm.DEC.CTR, AES_asm.HEAP_DATA + pos, wlen);
            wlen = asm.mac(AES_asm.MAC.CBC, AES_asm.HEAP_DATA + pos, wlen);
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
    AES_CCM.prototype.AES_CCM_Decrypt_finish = function () {
        var asm = this.asm;
        var heap = this.heap;
        var tagSize = this.tagSize;
        var pos = this.pos;
        var len = this.len;
        var rlen = len - tagSize;
        if (len < tagSize)
            throw new IllegalStateError('authentication tag not found');
        var result = new Uint8Array(rlen);
        var atag = new Uint8Array(heap.subarray(pos + rlen, pos + len));
        asm.cipher(AES_asm.DEC.CTR, AES_asm.HEAP_DATA + pos, (rlen + 15) & -16);
        result.set(heap.subarray(pos, pos + rlen));
        var i = rlen;
        for (; i & 15; i++)
            heap[pos + i] = 0;
        asm.mac(AES_asm.MAC.CBC, AES_asm.HEAP_DATA + pos, i);
        asm.set_counter(0, 0, 0, 0);
        asm.get_iv(AES_asm.HEAP_DATA);
        asm.cipher(AES_asm.ENC.CTR, AES_asm.HEAP_DATA, 16);
        var acheck = 0;
        for (var j = 0; j < tagSize; ++j)
            acheck |= atag[j] ^ heap[j];
        if (acheck)
            throw new SecurityError('data integrity check failed');
        this.counter = 1;
        this.pos = 0;
        this.len = 0;
        return result;
    };
    AES_CCM.prototype.AES_CTR_set_options = function (nonce, counter, size) {
        if (size < 8 || size > 48)
            throw new IllegalArgumentError('illegal counter size');
        var mask = Math.pow(2, size) - 1;
        this.asm.set_mask(0, 0, (mask / 0x100000000) | 0, mask | 0);
        var len = nonce.length;
        if (!len || len > 16)
            throw new IllegalArgumentError('illegal nonce size');
        this.nonce = nonce;
        var view = new DataView(new ArrayBuffer(16));
        new Uint8Array(view.buffer).set(nonce);
        this.asm.set_nonce(view.getUint32(0), view.getUint32(4), view.getUint32(8), view.getUint32(12));
        if (counter < 0 || counter >= Math.pow(2, size))
            throw new IllegalArgumentError('illegal counter value');
        this.counter = counter;
        this.asm.set_counter(0, 0, (counter / 0x100000000) | 0, counter | 0);
    };
    return AES_CCM;
}(AES));
export { AES_CCM };
