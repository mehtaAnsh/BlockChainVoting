import { AES } from './aes';
import { joinBytes } from '../other/utils';
export class AES_CBC extends AES {
    static encrypt(data, key, padding = true, iv) {
        return new AES_CBC(key, iv, padding).encrypt(data);
    }
    static decrypt(data, key, padding = true, iv) {
        return new AES_CBC(key, iv, padding).decrypt(data);
    }
    constructor(key, iv, padding = true) {
        super(key, iv, padding, 'CBC');
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
