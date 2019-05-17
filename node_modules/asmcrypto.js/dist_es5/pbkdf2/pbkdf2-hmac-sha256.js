import { HmacSha256 } from '../hmac/hmac-sha256';
export function Pbkdf2HmacSha256(password, salt, count, length) {
    var hmac = new HmacSha256(password);
    var result = new Uint8Array(length);
    var blocks = Math.ceil(length / hmac.HMAC_SIZE);
    for (var i = 1; i <= blocks; ++i) {
        var j = (i - 1) * hmac.HMAC_SIZE;
        var l = (i < blocks ? 0 : length % hmac.HMAC_SIZE) || hmac.HMAC_SIZE;
        hmac.reset().process(salt);
        hmac.hash.asm.pbkdf2_generate_block(hmac.hash.pos, hmac.hash.len, i, count, 0);
        result.set(hmac.hash.heap.subarray(0, l), j);
    }
    return result;
}
