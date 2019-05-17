export declare class AES_CMAC {
    private readonly k;
    private readonly cbc;
    private readonly buffer;
    private bufferLength;
    result: Uint8Array | null;
    static bytes(data: Uint8Array, key: Uint8Array): Uint8Array;
    constructor(key: Uint8Array);
    process(data: Uint8Array): this;
    finish(): this;
}
