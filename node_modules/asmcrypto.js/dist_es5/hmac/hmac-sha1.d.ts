import { Hmac } from './hmac';
import { sha1result } from '../hash/sha1/sha1.asm';
import { Hash } from '../hash/hash';
export declare class HmacSha1 extends Hmac<Hash<sha1result>> {
    result: Uint8Array | null;
    constructor(password: Uint8Array, verify?: Uint8Array);
    reset(): this;
    finish(): this;
}
