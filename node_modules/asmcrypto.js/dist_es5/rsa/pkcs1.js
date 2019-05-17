import { RSA } from './rsa';
import { IllegalArgumentError, IllegalStateError, SecurityError } from '../other/errors';
import { BigNumber } from '../bignum/bignum';
import { getRandomValues } from '../other/get-random-values';
var RSA_OAEP = /** @class */ (function () {
    function RSA_OAEP(key, hash, label) {
        this.rsa = new RSA(key);
        this.hash = hash;
        if (label !== undefined) {
            this.label = label.length > 0 ? label : null;
        }
        else {
            this.label = null;
        }
    }
    RSA_OAEP.prototype.encrypt = function (data, random) {
        var key_size = Math.ceil(this.rsa.key[0].bitLength / 8);
        var hash_size = this.hash.HASH_SIZE;
        var data_length = data.byteLength || data.length || 0;
        var ps_length = key_size - data_length - 2 * hash_size - 2;
        if (data_length > key_size - 2 * this.hash.HASH_SIZE - 2)
            throw new IllegalArgumentError('data too large');
        var message = new Uint8Array(key_size);
        var seed = message.subarray(1, hash_size + 1);
        var data_block = message.subarray(hash_size + 1);
        data_block.set(data, hash_size + ps_length + 1);
        data_block.set(this.hash.process(this.label || new Uint8Array(0)).finish().result, 0);
        data_block[hash_size + ps_length] = 1;
        if (random !== undefined) {
            if (seed.length !== random.length)
                throw new IllegalArgumentError('random size must equal the hash size');
            seed.set(random);
        }
        else {
            getRandomValues(seed);
        }
        var data_block_mask = this.RSA_MGF1_generate(seed, data_block.length);
        for (var i = 0; i < data_block.length; i++)
            data_block[i] ^= data_block_mask[i];
        var seed_mask = this.RSA_MGF1_generate(data_block, seed.length);
        for (var i = 0; i < seed.length; i++)
            seed[i] ^= seed_mask[i];
        this.rsa.encrypt(new BigNumber(message));
        return new Uint8Array(this.rsa.result);
    };
    RSA_OAEP.prototype.decrypt = function (data) {
        if (!this.rsa.key)
            throw new IllegalStateError('no key is associated with the instance');
        var key_size = Math.ceil(this.rsa.key[0].bitLength / 8);
        var hash_size = this.hash.HASH_SIZE;
        var data_length = data.byteLength || data.length || 0;
        if (data_length !== key_size)
            throw new IllegalArgumentError('bad data');
        this.rsa.decrypt(new BigNumber(data));
        var z = this.rsa.result[0];
        var seed = this.rsa.result.subarray(1, hash_size + 1);
        var data_block = this.rsa.result.subarray(hash_size + 1);
        if (z !== 0)
            throw new SecurityError('decryption failed');
        var seed_mask = this.RSA_MGF1_generate(data_block, seed.length);
        for (var i = 0; i < seed.length; i++)
            seed[i] ^= seed_mask[i];
        var data_block_mask = this.RSA_MGF1_generate(seed, data_block.length);
        for (var i = 0; i < data_block.length; i++)
            data_block[i] ^= data_block_mask[i];
        var lhash = this.hash
            .reset()
            .process(this.label || new Uint8Array(0))
            .finish().result;
        for (var i = 0; i < hash_size; i++) {
            if (lhash[i] !== data_block[i])
                throw new SecurityError('decryption failed');
        }
        var ps_end = hash_size;
        for (; ps_end < data_block.length; ps_end++) {
            var psz = data_block[ps_end];
            if (psz === 1)
                break;
            if (psz !== 0)
                throw new SecurityError('decryption failed');
        }
        if (ps_end === data_block.length)
            throw new SecurityError('decryption failed');
        this.rsa.result = data_block.subarray(ps_end + 1);
        return new Uint8Array(this.rsa.result);
    };
    RSA_OAEP.prototype.RSA_MGF1_generate = function (seed, length) {
        if (length === void 0) { length = 0; }
        var hash_size = this.hash.HASH_SIZE;
        //    if ( length > (hash_size * 0x100000000) )
        //        throw new IllegalArgumentError("mask length too large");
        var mask = new Uint8Array(length);
        var counter = new Uint8Array(4);
        var chunks = Math.ceil(length / hash_size);
        for (var i = 0; i < chunks; i++) {
            (counter[0] = i >>> 24), (counter[1] = (i >>> 16) & 255), (counter[2] = (i >>> 8) & 255), (counter[3] = i & 255);
            var submask = mask.subarray(i * hash_size);
            var chunk = this.hash
                .reset()
                .process(seed)
                .process(counter)
                .finish().result;
            if (chunk.length > submask.length)
                chunk = chunk.subarray(0, submask.length);
            submask.set(chunk);
        }
        return mask;
    };
    return RSA_OAEP;
}());
export { RSA_OAEP };
var RSA_PSS = /** @class */ (function () {
    function RSA_PSS(key, hash, saltLength) {
        if (saltLength === void 0) { saltLength = 4; }
        this.rsa = new RSA(key);
        this.hash = hash;
        this.saltLength = saltLength;
        if (this.saltLength < 0)
            throw new TypeError('saltLength should be a non-negative number');
        if (this.rsa.key !== null &&
            Math.ceil((this.rsa.key[0].bitLength - 1) / 8) < this.hash.HASH_SIZE + this.saltLength + 2)
            throw new SyntaxError('saltLength is too large');
    }
    RSA_PSS.prototype.sign = function (data, random) {
        var key_bits = this.rsa.key[0].bitLength;
        var hash_size = this.hash.HASH_SIZE;
        var message_length = Math.ceil((key_bits - 1) / 8);
        var salt_length = this.saltLength;
        var ps_length = message_length - salt_length - hash_size - 2;
        var message = new Uint8Array(message_length);
        var h_block = message.subarray(message_length - hash_size - 1, message_length - 1);
        var d_block = message.subarray(0, message_length - hash_size - 1);
        var d_salt = d_block.subarray(ps_length + 1);
        var m_block = new Uint8Array(8 + hash_size + salt_length);
        var m_hash = m_block.subarray(8, 8 + hash_size);
        var m_salt = m_block.subarray(8 + hash_size);
        m_hash.set(this.hash.process(data).finish().result);
        if (salt_length > 0) {
            if (random !== undefined) {
                if (m_salt.length !== random.length)
                    throw new IllegalArgumentError('random size must equal the salt size');
                m_salt.set(random);
            }
            else {
                getRandomValues(m_salt);
            }
        }
        d_block[ps_length] = 1;
        d_salt.set(m_salt);
        h_block.set(this.hash
            .reset()
            .process(m_block)
            .finish().result);
        var d_block_mask = this.RSA_MGF1_generate(h_block, d_block.length);
        for (var i = 0; i < d_block.length; i++)
            d_block[i] ^= d_block_mask[i];
        message[message_length - 1] = 0xbc;
        var zbits = 8 * message_length - key_bits + 1;
        if (zbits % 8)
            message[0] &= 0xff >>> zbits;
        this.rsa.decrypt(new BigNumber(message));
        return this.rsa.result;
    };
    RSA_PSS.prototype.verify = function (signature, data) {
        var key_bits = this.rsa.key[0].bitLength;
        var hash_size = this.hash.HASH_SIZE;
        var message_length = Math.ceil((key_bits - 1) / 8);
        var salt_length = this.saltLength;
        var ps_length = message_length - salt_length - hash_size - 2;
        this.rsa.encrypt(new BigNumber(signature));
        var message = this.rsa.result;
        if (message[message_length - 1] !== 0xbc)
            throw new SecurityError('bad signature');
        var h_block = message.subarray(message_length - hash_size - 1, message_length - 1);
        var d_block = message.subarray(0, message_length - hash_size - 1);
        var d_salt = d_block.subarray(ps_length + 1);
        var zbits = 8 * message_length - key_bits + 1;
        if (zbits % 8 && message[0] >>> (8 - zbits))
            throw new SecurityError('bad signature');
        var d_block_mask = this.RSA_MGF1_generate(h_block, d_block.length);
        for (var i = 0; i < d_block.length; i++)
            d_block[i] ^= d_block_mask[i];
        if (zbits % 8)
            message[0] &= 0xff >>> zbits;
        for (var i = 0; i < ps_length; i++) {
            if (d_block[i] !== 0)
                throw new SecurityError('bad signature');
        }
        if (d_block[ps_length] !== 1)
            throw new SecurityError('bad signature');
        var m_block = new Uint8Array(8 + hash_size + salt_length);
        var m_hash = m_block.subarray(8, 8 + hash_size);
        var m_salt = m_block.subarray(8 + hash_size);
        m_hash.set(this.hash
            .reset()
            .process(data)
            .finish().result);
        m_salt.set(d_salt);
        var h_block_verify = this.hash
            .reset()
            .process(m_block)
            .finish().result;
        for (var i = 0; i < hash_size; i++) {
            if (h_block[i] !== h_block_verify[i])
                throw new SecurityError('bad signature');
        }
    };
    RSA_PSS.prototype.RSA_MGF1_generate = function (seed, length) {
        if (length === void 0) { length = 0; }
        var hash_size = this.hash.HASH_SIZE;
        //    if ( length > (hash_size * 0x100000000) )
        //        throw new IllegalArgumentError("mask length too large");
        var mask = new Uint8Array(length);
        var counter = new Uint8Array(4);
        var chunks = Math.ceil(length / hash_size);
        for (var i = 0; i < chunks; i++) {
            (counter[0] = i >>> 24), (counter[1] = (i >>> 16) & 255), (counter[2] = (i >>> 8) & 255), (counter[3] = i & 255);
            var submask = mask.subarray(i * hash_size);
            var chunk = this.hash
                .reset()
                .process(seed)
                .process(counter)
                .finish().result;
            if (chunk.length > submask.length)
                chunk = chunk.subarray(0, submask.length);
            submask.set(chunk);
        }
        return mask;
    };
    return RSA_PSS;
}());
export { RSA_PSS };
var RSA_PKCS1_v1_5 = /** @class */ (function () {
    function RSA_PKCS1_v1_5(key, hash) {
        this.rsa = new RSA(key);
        this.hash = hash;
    }
    RSA_PKCS1_v1_5.prototype.sign = function (data) {
        if (!this.rsa.key) {
            throw new IllegalStateError('no key is associated with the instance');
        }
        var prefix = getHashPrefix(this.hash);
        var hash_size = this.hash.HASH_SIZE;
        var t_len = prefix.length + hash_size;
        var k = (this.rsa.key[0].bitLength + 7) >> 3;
        if (k < t_len + 11) {
            throw new Error('Message too long');
        }
        var m_hash = new Uint8Array(hash_size);
        m_hash.set(this.hash.process(data).finish().result);
        // EM = 0x00 || 0x01 || PS || 0x00 || T
        var em = new Uint8Array(k);
        var i = 0;
        em[i++] = 0; // 0x00
        em[i++] = 1; // 0x01
        // PS
        for (i; i < k - t_len - 1; i++) {
            em[i] = 0xff;
        }
        em[i++] = 0;
        em.set(prefix, i); // 0x00
        // T
        em.set(m_hash, em.length - hash_size);
        this.rsa.decrypt(new BigNumber(em));
        return this.rsa.result;
    };
    RSA_PKCS1_v1_5.prototype.verify = function (signature, data) {
        var prefix = getHashPrefix(this.hash);
        var hash_size = this.hash.HASH_SIZE;
        var t_len = prefix.length + hash_size;
        var k = (this.rsa.key[0].bitLength + 7) >> 3;
        if (k < t_len + 11) {
            throw new SecurityError('Bad signature');
        }
        this.rsa.encrypt(new BigNumber(signature));
        var m_hash = new Uint8Array(hash_size);
        m_hash.set(this.hash.process(data).finish().result);
        var res = 1;
        // EM = 0x00 || 0x01 || PS || 0x00 || T
        var decryptedSignature = this.rsa.result;
        var i = 0;
        res &= decryptedSignature[i++] === 0 ? 1 : 0; // 0x00
        res &= decryptedSignature[i++] === 1 ? 1 : 0; // 0x01
        // PS
        for (i; i < k - t_len - 1; i++) {
            res &= decryptedSignature[i] === 0xff ? 1 : 0;
        }
        res &= decryptedSignature[i++] === 0 ? 1 : 0; // 0x00
        // T
        var j = 0;
        var n = i + prefix.length;
        // prefix
        for (i; i < n; i++) {
            res &= decryptedSignature[i] === prefix[j++] ? 1 : 0;
        }
        j = 0;
        n = i + m_hash.length;
        // hash
        for (i; i < n; i++) {
            res &= decryptedSignature[i] === m_hash[j++] ? 1 : 0;
        }
        if (!res) {
            throw new SecurityError('Bad signature');
        }
    };
    return RSA_PKCS1_v1_5;
}());
export { RSA_PKCS1_v1_5 };
var HASH_PREFIXES = {
    sha1: new Uint8Array([0x30, 0x21, 0x30, 0x09, 0x06, 0x05, 0x2b, 0x0e, 0x03, 0x02, 0x1a, 0x05, 0x00, 0x04, 0x14]),
    sha256: new Uint8Array([
        0x30,
        0x31,
        0x30,
        0x0d,
        0x06,
        0x09,
        0x60,
        0x86,
        0x48,
        0x01,
        0x65,
        0x03,
        0x04,
        0x02,
        0x01,
        0x05,
        0x00,
        0x04,
        0x20,
    ]),
    sha384: new Uint8Array([
        0x30,
        0x41,
        0x30,
        0x0d,
        0x06,
        0x09,
        0x60,
        0x86,
        0x48,
        0x01,
        0x65,
        0x03,
        0x04,
        0x02,
        0x02,
        0x05,
        0x00,
        0x04,
        0x30,
    ]),
    sha512: new Uint8Array([
        0x30,
        0x51,
        0x30,
        0x0d,
        0x06,
        0x09,
        0x60,
        0x86,
        0x48,
        0x01,
        0x65,
        0x03,
        0x04,
        0x02,
        0x03,
        0x05,
        0x00,
        0x04,
        0x40,
    ]),
};
function getHashPrefix(hash) {
    var prefix = HASH_PREFIXES[hash.NAME];
    if (!prefix) {
        throw new Error("Cannot get hash prefix for hash algorithm '" + hash.NAME + "'");
    }
    return prefix;
}
