import CryptoJS from 'crypto-js';
import { AlgoritmoCifrado } from './AlgoritmoCifrado';

import type {  EncryptedPayload } from '../crypto/crypto.types';

const TripleDES = CryptoJS.TripleDES;

export class TripleDES_Cifrar extends AlgoritmoCifrado{

    constructor() {
        super();
    }

    async cifrar(textoPlano: string, clave: string): Promise<EncryptedPayload> {
        const encrypted = TripleDES.encrypt(textoPlano, clave).toString();
        return {
            algorithm: "3DES",
            cipher: encrypted,
        };
    }


    async descifrar(textoCifrado: EncryptedPayload, clave: string): Promise<string> {
        const decryptedBytes = TripleDES.decrypt(textoCifrado.cipher, clave);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return decryptedText;
    }

    getAlgoritmo(): string {return "3DES";}
}