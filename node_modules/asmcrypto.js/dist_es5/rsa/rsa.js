import { BigNumber, Modulus } from '../bignum/bignum';
import { IllegalStateError } from '../other/errors';
var RSA = /** @class */ (function () {
    function RSA(key) {
        var l = key.length;
        if (l !== 2 && l !== 3 && l !== 8)
            throw new SyntaxError('unexpected key type');
        var k0 = new Modulus(new BigNumber(key[0]));
        var k1 = new BigNumber(key[1]);
        this.key = {
            0: k0,
            1: k1,
        };
        if (l > 2) {
            this.key[2] = new BigNumber(key[2]);
        }
        if (l > 3) {
            this.key[3] = new Modulus(new BigNumber(key[3]));
            this.key[4] = new Modulus(new BigNumber(key[4]));
            this.key[5] = new BigNumber(key[5]);
            this.key[6] = new BigNumber(key[6]);
            this.key[7] = new BigNumber(key[7]);
        }
    }
    RSA.prototype.encrypt = function (msg) {
        if (!this.key)
            throw new IllegalStateError('no key is associated with the instance');
        if (this.key[0].compare(msg) <= 0)
            throw new RangeError('data too large');
        var m = this.key[0];
        var e = this.key[1];
        var result = m.power(msg, e).toBytes();
        var bytelen = (m.bitLength + 7) >> 3;
        if (result.length < bytelen) {
            var r = new Uint8Array(bytelen);
            r.set(result, bytelen - result.length);
            result = r;
        }
        this.result = result;
        return this;
    };
    RSA.prototype.decrypt = function (msg) {
        if (this.key[0].compare(msg) <= 0)
            throw new RangeError('data too large');
        var result;
        var m;
        if (this.key[3] !== undefined) {
            m = this.key[0];
            var p = this.key[3];
            var q = this.key[4];
            var dp = this.key[5];
            var dq = this.key[6];
            var u = this.key[7];
            var x = p.power(msg, dp);
            var y = q.power(msg, dq);
            var t = x.subtract(y);
            while (t.sign < 0)
                t = t.add(p);
            var h = p.reduce(u.multiply(t));
            result = h
                .multiply(q)
                .add(y)
                .clamp(m.bitLength)
                .toBytes();
        }
        else {
            m = this.key[0];
            var d = this.key[2];
            result = m.power(msg, d).toBytes();
        }
        var bytelen = (m.bitLength + 7) >> 3;
        if (result.length < bytelen) {
            var r = new Uint8Array(bytelen);
            r.set(result, bytelen - result.length);
            result = r;
        }
        this.result = result;
        return this;
    };
    return RSA;
}());
export { RSA };
