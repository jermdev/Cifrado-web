import CryptoJS from 'crypto-js';
import { AlgoritmoCifrado } from './AlgoritmoCifrado';

import type {  EncryptedPayload } from '../crypto/crypto.types';

const DES = CryptoJS.DES;

export class DES_Cifrar extends AlgoritmoCifrado{

    constructor() {
        super();
    }

    async cifrar(textoPlano: string, clave: string): Promise<EncryptedPayload> {
        const encrypted = DES.encrypt(textoPlano, clave).toString();
        return {
            algorithm: "DES",
            cipher: encrypted,
        };
    }


    async descifrar(textoCifrado: EncryptedPayload, clave: string): Promise<string> {
        const decryptedBytes = DES.decrypt(textoCifrado.cipher, clave);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return decryptedText;
    }

    getAlgoritmo(): string {return "DES";}
}