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
import { sha512_asm } from './sha512.asm';
import { Hash } from '../hash';
import { _heap_init } from '../../other/utils';
export var _sha512_block_size = 128;
export var _sha512_hash_size = 64;
var Sha512 = /** @class */ (function (_super) {
    __extends(Sha512, _super);
    function Sha512() {
        var _this = _super.call(this) || this;
        _this.NAME = 'sha512';
        _this.BLOCK_SIZE = _sha512_block_size;
        _this.HASH_SIZE = _sha512_hash_size;
        _this.heap = _heap_init();
        _this.asm = sha512_asm({ Uint8Array: Uint8Array }, null, _this.heap.buffer);
        _this.reset();
        return _this;
    }
    Sha512.NAME = 'sha512';
    return Sha512;
}(Hash));
export { Sha512 };
