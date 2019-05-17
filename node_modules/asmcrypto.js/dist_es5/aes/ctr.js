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
import { AES } from './aes';
import { IllegalArgumentError } from '../other/errors';
import { joinBytes } from '../other/utils';
var AES_CTR = /** @class */ (function (_super) {
    __extends(AES_CTR, _super);
    function AES_CTR(key, nonce) {
        var _this = _super.call(this, key, undefined, false, 'CTR') || this;
        delete _this.padding;
        _this.AES_CTR_set_options(nonce);
        return _this;
    }
    AES_CTR.encrypt = function (data, key, nonce) {
        return new AES_CTR(key, nonce).encrypt(data);
    };
    AES_CTR.decrypt = function (data, key, nonce) {
        return new AES_CTR(key, nonce).encrypt(data);
    };
    AES_CTR.prototype.encrypt = function (data) {
        var r1 = this.AES_Encrypt_process(data);
        var r2 = this.AES_Encrypt_finish();
        return joinBytes(r1, r2);
    };
    AES_CTR.prototype.decrypt = function (data) {
        var r1 = this.AES_Encrypt_process(data);
        var r2 = this.AES_Encrypt_finish();
        return joinBytes(r1, r2);
    };
    AES_CTR.prototype.AES_CTR_set_options = function (nonce, counter, size) {
        if (size !== undefined) {
            if (size < 8 || size > 48)
                throw new IllegalArgumentError('illegal counter size');
            var mask = Math.pow(2, size) - 1;
            this.asm.set_mask(0, 0, (mask / 0x100000000) | 0, mask | 0);
        }
        else {
            size = 48;
            this.asm.set_mask(0, 0, 0xffff, 0xffffffff);
        }
        if (nonce !== undefined) {
            var len = nonce.length;
            if (!len || len > 16)
                throw new IllegalArgumentError('illegal nonce size');
            var view = new DataView(new ArrayBuffer(16));
            new Uint8Array(view.buffer).set(nonce);
            this.asm.set_nonce(view.getUint32(0), view.getUint32(4), view.getUint32(8), view.getUint32(12));
        }
        else {
            throw new Error('nonce is required');
        }
        if (counter !== undefined) {
            if (counter < 0 || counter >= Math.pow(2, size))
                throw new IllegalArgumentError('illegal counter value');
            this.asm.set_counter(0, 0, (counter / 0x100000000) | 0, counter | 0);
        }
    };
    return AES_CTR;
}(AES));
export { AES_CTR };
