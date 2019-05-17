import { AES } from './aes';
import { joinBytes } from '../other/utils';
export class AES_ECB extends AES {
    static encrypt(data, key, padding = false) {
        return new AES_ECB(key, padding).encrypt(data);
    }
    static decrypt(data, key, padding = false) {
        return new AES_ECB(key, padding).decrypt(data);
    }
    constructor(key, padding = false) {
        super(key, undefined, padding, 'ECB');
    }
    encrypt(data) {
        const r1 = this.AES_Encrypt_process(data);
        const r2 = this.AES_Encrypt_finish();
        return joinBytes(r1, r2);
    }
    decrypt(data) {
        const r1 = this.AES_Decrypt_process(data);
        const r2 = this.AES_Decrypt_finish();
        return joinBytes(r1, r2);
    }
}
