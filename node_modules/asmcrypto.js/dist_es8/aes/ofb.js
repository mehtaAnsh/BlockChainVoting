import { AES } from './aes';
import { joinBytes } from '../other/utils';
export class AES_OFB extends AES {
    static encrypt(data, key, iv) {
        return new AES_OFB(key, iv).encrypt(data);
    }
    static decrypt(data, key, iv) {
        return new AES_OFB(key, iv).decrypt(data);
    }
    constructor(key, iv) {
        super(key, iv, false, 'OFB');
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
