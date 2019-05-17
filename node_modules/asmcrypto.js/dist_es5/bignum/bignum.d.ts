import { bigintresult } from './bigint.asm';
import { BigNumber_extGCD } from './extgcd';
export declare const _bigint_stdlib: {
    Uint32Array: Uint32ArrayConstructor;
    Math: Math;
};
export declare const _bigint_heap: Uint32Array;
export declare let _bigint_asm: bigintresult;
export declare class BigNumber {
    limbs: Uint32Array;
    bitLength: number;
    sign: number;
    static extGCD: typeof BigNumber_extGCD;
    static ZERO: BigNumber;
    static ONE: BigNumber;
    static fromString(str: string): BigNumber;
    static fromNumber(num: number): BigNumber;
    static fromArrayBuffer(buffer: ArrayBuffer): BigNumber;
    static fromConfig(obj: {
        limbs: Uint32Array;
        bitLength: number;
        sign: number;
    }): BigNumber;
    constructor(num?: Uint8Array);
    toString(radix: number): string;
    toBytes(): Uint8Array;
    /**
     * Downgrade to Number
     */
    valueOf(): number;
    clamp(b: number): BigNumber;
    slice(f: number, b?: number): BigNumber;
    negate(): BigNumber;
    compare(that: BigNumber): number;
    add(that: BigNumber): BigNumber;
    subtract(that: BigNumber): BigNumber;
    square(): BigNumber;
    divide(that: BigNumber): {
        quotient: BigNumber;
        remainder: BigNumber;
    };
    multiply(that: BigNumber): BigNumber;
    isMillerRabinProbablePrime(rounds: number): boolean;
    isProbablePrime(paranoia?: number): boolean;
}
export declare class Modulus extends BigNumber {
    private comodulus;
    private comodulusRemainder;
    private comodulusRemainderSquare;
    private coefficient;
    constructor(number: BigNumber);
    /**
     * Modular reduction
     */
    reduce(a: BigNumber): BigNumber;
    /**
     * Modular inverse
     */
    inverse(a: BigNumber): BigNumber;
    /**
     * Modular exponentiation
     */
    power(g: BigNumber, e: BigNumber): BigNumber;
    static _Montgomery_reduce(a: BigNumber, n: Modulus): BigNumber;
}
