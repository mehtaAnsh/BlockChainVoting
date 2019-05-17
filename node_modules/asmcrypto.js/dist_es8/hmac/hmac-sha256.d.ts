import { Hmac } from './hmac';
import { sha256result } from '../hash/sha256/sha256.asm';
import { Hash } from '../hash/hash';
export declare class HmacSha256 extends Hmac<Hash<sha256result>> {
    result: Uint8Array | null;
    constructor(password: Uint8Array, verify?: Uint8Array);
    reset(): this;
    finish(): this;
}
