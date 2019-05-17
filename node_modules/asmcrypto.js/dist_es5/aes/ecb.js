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
import { joinBytes } from '../other/utils';
var AES_ECB = /** @class */ (function (_super) {
    __extends(AES_ECB, _super);
    function AES_ECB(key, padding) {
        if (padding === void 0) { padding = false; }
        return _super.call(this, key, undefined, padding, 'ECB') || this;
    }
    AES_ECB.encrypt = function (data, key, padding) {
        if (padding === void 0) { padding = false; }
        return new AES_ECB(key, padding).encrypt(data);
    };
    AES_ECB.decrypt = function (data, key, padding) {
        if (padding === void 0) { padding = false; }
        return new AES_ECB(key, padding).decrypt(data);
    };
    AES_ECB.prototype.encrypt = function (data) {
        var r1 = this.AES_Encrypt_process(data);
        var r2 = this.AES_Encrypt_finish();
        return joinBytes(r1, r2);
    };
    AES_ECB.prototype.decrypt = function (data) {
        var r1 = this.AES_Decrypt_process(data);
        var r2 = this.AES_Decrypt_finish();
        return joinBytes(r1, r2);
    };
    return AES_ECB;
}(AES));
export { AES_ECB };
