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
var AES_CBC = /** @class */ (function (_super) {
    __extends(AES_CBC, _super);
    function AES_CBC(key, iv, padding) {
        if (padding === void 0) { padding = true; }
        return _super.call(this, key, iv, padding, 'CBC') || this;
    }
    AES_CBC.encrypt = function (data, key, padding, iv) {
        if (padding === void 0) { padding = true; }
        return new AES_CBC(key, iv, padding).encrypt(data);
    };
    AES_CBC.decrypt = function (data, key, padding, iv) {
        if (padding === void 0) { padding = true; }
        return new AES_CBC(key, iv, padding).decrypt(data);
    };
    AES_CBC.prototype.encrypt = function (data) {
        var r1 = this.AES_Encrypt_process(data);
        var r2 = this.AES_Encrypt_finish();
        return joinBytes(r1, r2);
    };
    AES_CBC.prototype.decrypt = function (data) {
        var r1 = this.AES_Decrypt_process(data);
        var r2 = this.AES_Decrypt_finish();
        return joinBytes(r1, r2);
    };
    return AES_CBC;
}(AES));
export { AES_CBC };
