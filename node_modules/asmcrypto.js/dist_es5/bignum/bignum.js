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
import { bigint_asm } from './bigint.asm';
import { string_to_bytes } from '../other/utils';
import { IllegalArgumentError } from '../other/errors';
import { BigNumber_extGCD, Number_extGCD } from './extgcd';
import { getRandomValues } from '../other/get-random-values';
///////////////////////////////////////////////////////////////////////////////
export var _bigint_stdlib = { Uint32Array: Uint32Array, Math: Math };
export var _bigint_heap = new Uint32Array(0x100000);
export var _bigint_asm;
function _half_imul(a, b) {
    return (a * b) | 0;
}
if (_bigint_stdlib.Math.imul === undefined) {
    _bigint_stdlib.Math.imul = _half_imul;
    _bigint_asm = bigint_asm(_bigint_stdlib, null, _bigint_heap.buffer);
    delete _bigint_stdlib.Math.imul;
}
else {
    _bigint_asm = bigint_asm(_bigint_stdlib, null, _bigint_heap.buffer);
}
///////////////////////////////////////////////////////////////////////////////
var _BigNumber_ZERO_limbs = new Uint32Array(0);
var BigNumber = /** @class */ (function () {
    function BigNumber(num) {
        var limbs = _BigNumber_ZERO_limbs;
        var bitlen = 0;
        var sign = 0;
        if (num === undefined) {
            // do nothing
        }
        else {
            for (var i = 0; !num[i]; i++)
                ;
            bitlen = (num.length - i) * 8;
            if (!bitlen)
                return BigNumber.ZERO;
            limbs = new Uint32Array((bitlen + 31) >> 5);
            for (var j = num.length - 4; j >= i; j -= 4) {
                limbs[(num.length - 4 - j) >> 2] = (num[j] << 24) | (num[j + 1] << 16) | (num[j + 2] << 8) | num[j + 3];
            }
            if (i - j === 3) {
                limbs[limbs.length - 1] = num[i];
            }
            else if (i - j === 2) {
                limbs[limbs.length - 1] = (num[i] << 8) | num[i + 1];
            }
            else if (i - j === 1) {
                limbs[limbs.length - 1] = (num[i] << 16) | (num[i + 1] << 8) | num[i + 2];
            }
            sign = 1;
        }
        this.limbs = limbs;
        this.bitLength = bitlen;
        this.sign = sign;
    }
    BigNumber.fromString = function (str) {
        var bytes = string_to_bytes(str);
        return new BigNumber(bytes);
    };
    BigNumber.fromNumber = function (num) {
        var limbs = _BigNumber_ZERO_limbs;
        var bitlen = 0;
        var sign = 0;
        var absnum = Math.abs(num);
        if (absnum > 0xffffffff) {
            limbs = new Uint32Array(2);
            limbs[0] = absnum | 0;
            limbs[1] = (absnum / 0x100000000) | 0;
            bitlen = 52;
        }
        else if (absnum > 0) {
            limbs = new Uint32Array(1);
            limbs[0] = absnum;
            bitlen = 32;
        }
        else {
            limbs = _BigNumber_ZERO_limbs;
            bitlen = 0;
        }
        sign = num < 0 ? -1 : 1;
        return BigNumber.fromConfig({ limbs: limbs, bitLength: bitlen, sign: sign });
    };
    BigNumber.fromArrayBuffer = function (buffer) {
        return new BigNumber(new Uint8Array(buffer));
    };
    BigNumber.fromConfig = function (obj) {
        var bn = new BigNumber();
        bn.limbs = new Uint32Array(obj.limbs);
        bn.bitLength = obj.bitLength;
        bn.sign = obj.sign;
        return bn;
    };
    BigNumber.prototype.toString = function (radix) {
        radix = radix || 16;
        var limbs = this.limbs;
        var bitlen = this.bitLength;
        var str = '';
        if (radix === 16) {
            // FIXME clamp last limb to (bitlen % 32)
            for (var i = ((bitlen + 31) >> 5) - 1; i >= 0; i--) {
                var h = limbs[i].toString(16);
                str += '00000000'.substr(h.length);
                str += h;
            }
            str = str.replace(/^0+/, '');
            if (!str.length)
                str = '0';
        }
        else {
            throw new IllegalArgumentError('bad radix');
        }
        if (this.sign < 0)
            str = '-' + str;
        return str;
    };
    BigNumber.prototype.toBytes = function () {
        var bitlen = this.bitLength;
        var limbs = this.limbs;
        if (bitlen === 0)
            return new Uint8Array(0);
        var bytelen = (bitlen + 7) >> 3;
        var bytes = new Uint8Array(bytelen);
        for (var i = 0; i < bytelen; i++) {
            var j = bytelen - i - 1;
            bytes[i] = limbs[j >> 2] >> ((j & 3) << 3);
        }
        return bytes;
    };
    /**
     * Downgrade to Number
     */
    BigNumber.prototype.valueOf = function () {
        var limbs = this.limbs;
        var bits = this.bitLength;
        var sign = this.sign;
        if (!sign)
            return 0;
        if (bits <= 32)
            return sign * (limbs[0] >>> 0);
        if (bits <= 52)
            return sign * (0x100000000 * (limbs[1] >>> 0) + (limbs[0] >>> 0));
        // normalization
        var i, l, e = 0;
        for (i = limbs.length - 1; i >= 0; i--) {
            if ((l = limbs[i]) === 0)
                continue;
            while (((l << e) & 0x80000000) === 0)
                e++;
            break;
        }
        if (i === 0)
            return sign * (limbs[0] >>> 0);
        return (sign *
            (0x100000 * (((limbs[i] << e) | (e ? limbs[i - 1] >>> (32 - e) : 0)) >>> 0) +
                (((limbs[i - 1] << e) | (e && i > 1 ? limbs[i - 2] >>> (32 - e) : 0)) >>> 12)) *
            Math.pow(2, 32 * i - e - 52));
    };
    BigNumber.prototype.clamp = function (b) {
        var limbs = this.limbs;
        var bitlen = this.bitLength;
        // FIXME check b is number and in a valid range
        if (b >= bitlen)
            return this;
        var clamped = new BigNumber();
        var n = (b + 31) >> 5;
        var k = b % 32;
        clamped.limbs = new Uint32Array(limbs.subarray(0, n));
        clamped.bitLength = b;
        clamped.sign = this.sign;
        if (k)
            clamped.limbs[n - 1] &= -1 >>> (32 - k);
        return clamped;
    };
    BigNumber.prototype.slice = function (f, b) {
        var limbs = this.limbs;
        var bitlen = this.bitLength;
        if (f < 0)
            throw new RangeError('TODO');
        if (f >= bitlen)
            return BigNumber.ZERO;
        if (b === undefined || b > bitlen - f)
            b = bitlen - f;
        var sliced = new BigNumber();
        var n = f >> 5;
        var m = (f + b + 31) >> 5;
        var l = (b + 31) >> 5;
        var t = f % 32;
        var k = b % 32;
        var slimbs = new Uint32Array(l);
        if (t) {
            for (var i = 0; i < m - n - 1; i++) {
                slimbs[i] = (limbs[n + i] >>> t) | (limbs[n + i + 1] << (32 - t));
            }
            slimbs[i] = limbs[n + i] >>> t;
        }
        else {
            slimbs.set(limbs.subarray(n, m));
        }
        if (k) {
            slimbs[l - 1] &= -1 >>> (32 - k);
        }
        sliced.limbs = slimbs;
        sliced.bitLength = b;
        sliced.sign = this.sign;
        return sliced;
    };
    BigNumber.prototype.negate = function () {
        var negative = new BigNumber();
        negative.limbs = this.limbs;
        negative.bitLength = this.bitLength;
        negative.sign = -1 * this.sign;
        return negative;
    };
    BigNumber.prototype.compare = function (that) {
        var alimbs = this.limbs, alimbcnt = alimbs.length, blimbs = that.limbs, blimbcnt = blimbs.length, z = 0;
        if (this.sign < that.sign)
            return -1;
        if (this.sign > that.sign)
            return 1;
        _bigint_heap.set(alimbs, 0);
        _bigint_heap.set(blimbs, alimbcnt);
        z = _bigint_asm.cmp(0, alimbcnt << 2, alimbcnt << 2, blimbcnt << 2);
        return z * this.sign;
    };
    BigNumber.prototype.add = function (that) {
        if (!this.sign)
            return that;
        if (!that.sign)
            return this;
        var abitlen = this.bitLength, alimbs = this.limbs, alimbcnt = alimbs.length, asign = this.sign, bbitlen = that.bitLength, blimbs = that.limbs, blimbcnt = blimbs.length, bsign = that.sign, rbitlen, rlimbcnt, rsign, rof, result = new BigNumber();
        rbitlen = (abitlen > bbitlen ? abitlen : bbitlen) + (asign * bsign > 0 ? 1 : 0);
        rlimbcnt = (rbitlen + 31) >> 5;
        _bigint_asm.sreset();
        var pA = _bigint_asm.salloc(alimbcnt << 2), pB = _bigint_asm.salloc(blimbcnt << 2), pR = _bigint_asm.salloc(rlimbcnt << 2);
        _bigint_asm.z(pR - pA + (rlimbcnt << 2), 0, pA);
        _bigint_heap.set(alimbs, pA >> 2);
        _bigint_heap.set(blimbs, pB >> 2);
        if (asign * bsign > 0) {
            _bigint_asm.add(pA, alimbcnt << 2, pB, blimbcnt << 2, pR, rlimbcnt << 2);
            rsign = asign;
        }
        else if (asign > bsign) {
            rof = _bigint_asm.sub(pA, alimbcnt << 2, pB, blimbcnt << 2, pR, rlimbcnt << 2);
            rsign = rof ? bsign : asign;
        }
        else {
            rof = _bigint_asm.sub(pB, blimbcnt << 2, pA, alimbcnt << 2, pR, rlimbcnt << 2);
            rsign = rof ? asign : bsign;
        }
        if (rof)
            _bigint_asm.neg(pR, rlimbcnt << 2, pR, rlimbcnt << 2);
        if (_bigint_asm.tst(pR, rlimbcnt << 2) === 0)
            return BigNumber.ZERO;
        result.limbs = new Uint32Array(_bigint_heap.subarray(pR >> 2, (pR >> 2) + rlimbcnt));
        result.bitLength = rbitlen;
        result.sign = rsign;
        return result;
    };
    BigNumber.prototype.subtract = function (that) {
        return this.add(that.negate());
    };
    BigNumber.prototype.square = function () {
        if (!this.sign)
            return BigNumber.ZERO;
        var abitlen = this.bitLength, alimbs = this.limbs, alimbcnt = alimbs.length, rbitlen, rlimbcnt, result = new BigNumber();
        rbitlen = abitlen << 1;
        rlimbcnt = (rbitlen + 31) >> 5;
        _bigint_asm.sreset();
        var pA = _bigint_asm.salloc(alimbcnt << 2), pR = _bigint_asm.salloc(rlimbcnt << 2);
        _bigint_asm.z(pR - pA + (rlimbcnt << 2), 0, pA);
        _bigint_heap.set(alimbs, pA >> 2);
        _bigint_asm.sqr(pA, alimbcnt << 2, pR);
        result.limbs = new Uint32Array(_bigint_heap.subarray(pR >> 2, (pR >> 2) + rlimbcnt));
        result.bitLength = rbitlen;
        result.sign = 1;
        return result;
    };
    BigNumber.prototype.divide = function (that) {
        var abitlen = this.bitLength, alimbs = this.limbs, alimbcnt = alimbs.length, bbitlen = that.bitLength, blimbs = that.limbs, blimbcnt = blimbs.length, qlimbcnt, rlimbcnt, quotient = BigNumber.ZERO, remainder = BigNumber.ZERO;
        _bigint_asm.sreset();
        var pA = _bigint_asm.salloc(alimbcnt << 2), pB = _bigint_asm.salloc(blimbcnt << 2), pQ = _bigint_asm.salloc(alimbcnt << 2);
        _bigint_asm.z(pQ - pA + (alimbcnt << 2), 0, pA);
        _bigint_heap.set(alimbs, pA >> 2);
        _bigint_heap.set(blimbs, pB >> 2);
        _bigint_asm.div(pA, alimbcnt << 2, pB, blimbcnt << 2, pQ);
        qlimbcnt = _bigint_asm.tst(pQ, alimbcnt << 2) >> 2;
        if (qlimbcnt) {
            quotient = new BigNumber();
            quotient.limbs = new Uint32Array(_bigint_heap.subarray(pQ >> 2, (pQ >> 2) + qlimbcnt));
            quotient.bitLength = abitlen < qlimbcnt << 5 ? abitlen : qlimbcnt << 5;
            quotient.sign = this.sign * that.sign;
        }
        rlimbcnt = _bigint_asm.tst(pA, blimbcnt << 2) >> 2;
        if (rlimbcnt) {
            remainder = new BigNumber();
            remainder.limbs = new Uint32Array(_bigint_heap.subarray(pA >> 2, (pA >> 2) + rlimbcnt));
            remainder.bitLength = bbitlen < rlimbcnt << 5 ? bbitlen : rlimbcnt << 5;
            remainder.sign = this.sign;
        }
        return {
            quotient: quotient,
            remainder: remainder,
        };
    };
    BigNumber.prototype.multiply = function (that) {
        if (!this.sign || !that.sign)
            return BigNumber.ZERO;
        var abitlen = this.bitLength, alimbs = this.limbs, alimbcnt = alimbs.length, bbitlen = that.bitLength, blimbs = that.limbs, blimbcnt = blimbs.length, rbitlen, rlimbcnt, result = new BigNumber();
        rbitlen = abitlen + bbitlen;
        rlimbcnt = (rbitlen + 31) >> 5;
        _bigint_asm.sreset();
        var pA = _bigint_asm.salloc(alimbcnt << 2), pB = _bigint_asm.salloc(blimbcnt << 2), pR = _bigint_asm.salloc(rlimbcnt << 2);
        _bigint_asm.z(pR - pA + (rlimbcnt << 2), 0, pA);
        _bigint_heap.set(alimbs, pA >> 2);
        _bigint_heap.set(blimbs, pB >> 2);
        _bigint_asm.mul(pA, alimbcnt << 2, pB, blimbcnt << 2, pR, rlimbcnt << 2);
        result.limbs = new Uint32Array(_bigint_heap.subarray(pR >> 2, (pR >> 2) + rlimbcnt));
        result.sign = this.sign * that.sign;
        result.bitLength = rbitlen;
        return result;
    };
    BigNumber.prototype.isMillerRabinProbablePrime = function (rounds) {
        var t = BigNumber.fromConfig(this), s = 0;
        t.limbs[0] -= 1;
        while (t.limbs[s >> 5] === 0)
            s += 32;
        while (((t.limbs[s >> 5] >> (s & 31)) & 1) === 0)
            s++;
        t = t.slice(s);
        var m = new Modulus(this), m1 = this.subtract(BigNumber.ONE), a = BigNumber.fromConfig(this), l = this.limbs.length - 1;
        while (a.limbs[l] === 0)
            l--;
        while (--rounds >= 0) {
            getRandomValues(a.limbs);
            if (a.limbs[0] < 2)
                a.limbs[0] += 2;
            while (a.compare(m1) >= 0)
                a.limbs[l] >>>= 1;
            var x = m.power(a, t);
            if (x.compare(BigNumber.ONE) === 0)
                continue;
            if (x.compare(m1) === 0)
                continue;
            var c = s;
            while (--c > 0) {
                x = x.square().divide(m).remainder;
                if (x.compare(BigNumber.ONE) === 0)
                    return false;
                if (x.compare(m1) === 0)
                    break;
            }
            if (c === 0)
                return false;
        }
        return true;
    };
    BigNumber.prototype.isProbablePrime = function (paranoia) {
        if (paranoia === void 0) { paranoia = 80; }
        var limbs = this.limbs;
        var i = 0;
        // Oddity test
        // (50% false positive probability)
        if ((limbs[0] & 1) === 0)
            return false;
        if (paranoia <= 1)
            return true;
        // Magic divisors (3, 5, 17) test
        // (~25% false positive probability)
        var s3 = 0, s5 = 0, s17 = 0;
        for (i = 0; i < limbs.length; i++) {
            var l3 = limbs[i];
            while (l3) {
                s3 += l3 & 3;
                l3 >>>= 2;
            }
            var l5 = limbs[i];
            while (l5) {
                s5 += l5 & 3;
                l5 >>>= 2;
                s5 -= l5 & 3;
                l5 >>>= 2;
            }
            var l17 = limbs[i];
            while (l17) {
                s17 += l17 & 15;
                l17 >>>= 4;
                s17 -= l17 & 15;
                l17 >>>= 4;
            }
        }
        if (!(s3 % 3) || !(s5 % 5) || !(s17 % 17))
            return false;
        if (paranoia <= 2)
            return true;
        // Miller-Rabin test
        // (≤ 4^(-k) false positive probability)
        return this.isMillerRabinProbablePrime(paranoia >>> 1);
    };
    BigNumber.extGCD = BigNumber_extGCD;
    BigNumber.ZERO = BigNumber.fromNumber(0);
    BigNumber.ONE = BigNumber.fromNumber(1);
    return BigNumber;
}());
export { BigNumber };
var Modulus = /** @class */ (function (_super) {
    __extends(Modulus, _super);
    function Modulus(number) {
        var _this = _super.call(this) || this;
        _this.limbs = number.limbs;
        _this.bitLength = number.bitLength;
        _this.sign = number.sign;
        if (_this.valueOf() < 1)
            throw new RangeError();
        if (_this.bitLength <= 32)
            return _this;
        var comodulus;
        if (_this.limbs[0] & 1) {
            var bitlen = ((_this.bitLength + 31) & -32) + 1;
            var limbs = new Uint32Array((bitlen + 31) >> 5);
            limbs[limbs.length - 1] = 1;
            comodulus = new BigNumber();
            comodulus.sign = 1;
            comodulus.bitLength = bitlen;
            comodulus.limbs = limbs;
            var k = Number_extGCD(0x100000000, _this.limbs[0]).y;
            _this.coefficient = k < 0 ? -k : 0x100000000 - k;
        }
        else {
            return _this;
        }
        _this.comodulus = comodulus;
        _this.comodulusRemainder = comodulus.divide(_this).remainder;
        _this.comodulusRemainderSquare = comodulus.square().divide(_this).remainder;
        return _this;
    }
    /**
     * Modular reduction
     */
    Modulus.prototype.reduce = function (a) {
        if (a.bitLength <= 32 && this.bitLength <= 32)
            return BigNumber.fromNumber(a.valueOf() % this.valueOf());
        if (a.compare(this) < 0)
            return a;
        return a.divide(this).remainder;
    };
    /**
     * Modular inverse
     */
    Modulus.prototype.inverse = function (a) {
        a = this.reduce(a);
        var r = BigNumber_extGCD(this, a);
        if (r.gcd.valueOf() !== 1)
            throw new Error('GCD is not 1');
        if (r.y.sign < 0)
            return r.y.add(this).clamp(this.bitLength);
        return r.y;
    };
    /**
     * Modular exponentiation
     */
    Modulus.prototype.power = function (g, e) {
        // count exponent set bits
        var c = 0;
        for (var i = 0; i < e.limbs.length; i++) {
            var t = e.limbs[i];
            while (t) {
                if (t & 1)
                    c++;
                t >>>= 1;
            }
        }
        // window size parameter
        var k = 8;
        if (e.bitLength <= 4536)
            k = 7;
        if (e.bitLength <= 1736)
            k = 6;
        if (e.bitLength <= 630)
            k = 5;
        if (e.bitLength <= 210)
            k = 4;
        if (e.bitLength <= 60)
            k = 3;
        if (e.bitLength <= 12)
            k = 2;
        if (c <= 1 << (k - 1))
            k = 1;
        // montgomerize base
        g = Modulus._Montgomery_reduce(this.reduce(g).multiply(this.comodulusRemainderSquare), this);
        // precompute odd powers
        var g2 = Modulus._Montgomery_reduce(g.square(), this), gn = new Array(1 << (k - 1));
        gn[0] = g;
        gn[1] = Modulus._Montgomery_reduce(g.multiply(g2), this);
        for (var i = 2; i < 1 << (k - 1); i++) {
            gn[i] = Modulus._Montgomery_reduce(gn[i - 1].multiply(g2), this);
        }
        // perform exponentiation
        var u = this.comodulusRemainder;
        var r = u;
        for (var i = e.limbs.length - 1; i >= 0; i--) {
            var t = e.limbs[i];
            for (var j = 32; j > 0;) {
                if (t & 0x80000000) {
                    var n = t >>> (32 - k), l = k;
                    while ((n & 1) === 0) {
                        n >>>= 1;
                        l--;
                    }
                    var m = gn[n >>> 1];
                    while (n) {
                        n >>>= 1;
                        if (r !== u)
                            r = Modulus._Montgomery_reduce(r.square(), this);
                    }
                    r = r !== u ? Modulus._Montgomery_reduce(r.multiply(m), this) : m;
                    (t <<= l), (j -= l);
                }
                else {
                    if (r !== u)
                        r = Modulus._Montgomery_reduce(r.square(), this);
                    (t <<= 1), j--;
                }
            }
        }
        // de-montgomerize result
        return Modulus._Montgomery_reduce(r, this);
    };
    Modulus._Montgomery_reduce = function (a, n) {
        var alimbs = a.limbs;
        var alimbcnt = alimbs.length;
        var nlimbs = n.limbs;
        var nlimbcnt = nlimbs.length;
        var y = n.coefficient;
        _bigint_asm.sreset();
        var pA = _bigint_asm.salloc(alimbcnt << 2), pN = _bigint_asm.salloc(nlimbcnt << 2), pR = _bigint_asm.salloc(nlimbcnt << 2);
        _bigint_asm.z(pR - pA + (nlimbcnt << 2), 0, pA);
        _bigint_heap.set(alimbs, pA >> 2);
        _bigint_heap.set(nlimbs, pN >> 2);
        _bigint_asm.mredc(pA, alimbcnt << 2, pN, nlimbcnt << 2, y, pR);
        var result = new BigNumber();
        result.limbs = new Uint32Array(_bigint_heap.subarray(pR >> 2, (pR >> 2) + nlimbcnt));
        result.bitLength = n.bitLength;
        result.sign = 1;
        return result;
    };
    return Modulus;
}(BigNumber));
export { Modulus };
