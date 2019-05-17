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
import { Hmac } from './hmac';
import { IllegalStateError } from '../other/errors';
import { _sha256_hash_size, Sha256 } from '../hash/sha256/sha256';
var HmacSha256 = /** @class */ (function (_super) {
    __extends(HmacSha256, _super);
    function HmacSha256(password, verify) {
        var _this = this;
        var hash = new Sha256();
        // Calculate ipad, init the underlying engine, calculate this.key
        _this = _super.call(this, hash, password, verify) || this;
        _this.reset();
        if (verify !== undefined) {
            _this._hmac_init_verify(verify);
        }
        else {
            _this.verify = null;
        }
        return _this;
    }
    HmacSha256.prototype.reset = function () {
        var key = this.key;
        this.hash
            .reset()
            .asm.hmac_init((key[0] << 24) | (key[1] << 16) | (key[2] << 8) | key[3], (key[4] << 24) | (key[5] << 16) | (key[6] << 8) | key[7], (key[8] << 24) | (key[9] << 16) | (key[10] << 8) | key[11], (key[12] << 24) | (key[13] << 16) | (key[14] << 8) | key[15], (key[16] << 24) | (key[17] << 16) | (key[18] << 8) | key[19], (key[20] << 24) | (key[21] << 16) | (key[22] << 8) | key[23], (key[24] << 24) | (key[25] << 16) | (key[26] << 8) | key[27], (key[28] << 24) | (key[29] << 16) | (key[30] << 8) | key[31], (key[32] << 24) | (key[33] << 16) | (key[34] << 8) | key[35], (key[36] << 24) | (key[37] << 16) | (key[38] << 8) | key[39], (key[40] << 24) | (key[41] << 16) | (key[42] << 8) | key[43], (key[44] << 24) | (key[45] << 16) | (key[46] << 8) | key[47], (key[48] << 24) | (key[49] << 16) | (key[50] << 8) | key[51], (key[52] << 24) | (key[53] << 16) | (key[54] << 8) | key[55], (key[56] << 24) | (key[57] << 16) | (key[58] << 8) | key[59], (key[60] << 24) | (key[61] << 16) | (key[62] << 8) | key[63]);
        return this;
    };
    HmacSha256.prototype.finish = function () {
        if (this.key === null)
            throw new IllegalStateError('no key is associated with the instance');
        if (this.result !== null)
            throw new IllegalStateError('state must be reset before processing new data');
        var hash = this.hash;
        var asm = this.hash.asm;
        var heap = this.hash.heap;
        asm.hmac_finish(hash.pos, hash.len, 0);
        var verify = this.verify;
        var result = new Uint8Array(_sha256_hash_size);
        result.set(heap.subarray(0, _sha256_hash_size));
        if (verify) {
            if (verify.length === result.length) {
                var diff = 0;
                for (var i = 0; i < verify.length; i++) {
                    diff |= verify[i] ^ result[i];
                }
                if (diff !== 0)
                    throw new Error("HMAC verification failed, hash value doesn't match");
            }
            else {
                throw new Error("HMAC verification failed, lengths doesn't match");
            }
        }
        else {
            this.result = result;
        }
        return this;
    };
    return HmacSha256;
}(Hmac));
export { HmacSha256 };
