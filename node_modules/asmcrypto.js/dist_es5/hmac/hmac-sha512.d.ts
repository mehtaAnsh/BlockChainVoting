import { Hmac } from './hmac';
import { Hash } from '../hash/hash';
import { sha512result } from '../hash/sha512/sha512.asm';
export declare class HmacSha512 extends Hmac<Hash<sha512result>> {
    result: Uint8Array | null;
    constructor(password: Uint8Array, verify?: Uint8Array);
    reset(): this;
    finish(): this;
}
