import { Sha512 } from '../hash/sha512/sha512';
import { Sha1 } from '../hash/sha1/sha1';
import { Sha256 } from '../hash/sha256/sha256';
export declare class RSA_OAEP {
    private readonly rsa;
    private readonly label;
    private readonly hash;
    constructor(key: Uint8Array[], hash: Sha1 | Sha256 | Sha512, label?: Uint8Array);
    encrypt(data: Uint8Array, random?: Uint8Array): Uint8Array;
    decrypt(data: Uint8Array): Uint8Array;
    RSA_MGF1_generate(seed: Uint8Array, length?: number): Uint8Array;
}
export declare class RSA_PSS {
    private readonly rsa;
    private readonly saltLength;
    private readonly hash;
    constructor(key: Uint8Array[], hash: Sha1 | Sha256 | Sha512, saltLength?: number);
    sign(data: Uint8Array, random?: Uint8Array): Uint8Array;
    verify(signature: Uint8Array, data: Uint8Array): void;
    RSA_MGF1_generate(seed: Uint8Array, length?: number): Uint8Array;
}
export declare class RSA_PKCS1_v1_5 {
    private readonly rsa;
    private readonly hash;
    constructor(key: Uint8Array[], hash: Sha1 | Sha256 | Sha512);
    sign(data: Uint8Array): Uint8Array;
    verify(signature: Uint8Array, data: Uint8Array): void;
}
