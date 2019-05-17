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
var IllegalStateError = /** @class */ (function (_super) {
    __extends(IllegalStateError, _super);
    function IllegalStateError() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        Object.create(Error.prototype, { name: { value: 'IllegalStateError' } });
        return _this;
    }
    return IllegalStateError;
}(Error));
export { IllegalStateError };
var IllegalArgumentError = /** @class */ (function (_super) {
    __extends(IllegalArgumentError, _super);
    function IllegalArgumentError() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        Object.create(Error.prototype, { name: { value: 'IllegalArgumentError' } });
        return _this;
    }
    return IllegalArgumentError;
}(Error));
export { IllegalArgumentError };
var SecurityError = /** @class */ (function (_super) {
    __extends(SecurityError, _super);
    function SecurityError() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        Object.create(Error.prototype, { name: { value: 'SecurityError' } });
        return _this;
    }
    return SecurityError;
}(Error));
export { SecurityError };
