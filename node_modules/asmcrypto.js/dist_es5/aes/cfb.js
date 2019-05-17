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
var AES_CFB = /** @class */ (function (_super) {
    __extends(AES_CFB, _super);
    function AES_CFB(key, iv) {
        var _this = _super.call(this, key, iv, true, 'CFB') || this;
        delete _this.padding;
        return _this;
    }
    AES_CFB.encrypt = function (data, key, iv) {
        return new AES_CFB(key, iv).encrypt(data);
    };
    AES_CFB.decrypt = function (data, key, iv) {
        return new AES_CFB(key, iv).decrypt(data);
    };
    AES_CFB.prototype.encrypt = function (data) {
        var r1 = this.AES_Encrypt_process(data);
        var r2 = this.AES_Encrypt_finish();
        return joinBytes(r1, r2);
    };
    AES_CFB.prototype.decrypt = function (data) {
        var r1 = this.AES_Decrypt_process(data);
        var r2 = this.AES_Decrypt_finish();
        return joinBytes(r1, r2);
    };
    return AES_CFB;
}(AES));
export { AES_CFB };
