import CryptoJS from 'crypto-js';
import { AlgoritmoCifrado } from './AlgoritmoCifrado';

import type {  EncryptedPayload } from '../crypto/crypto.types';

const Blowfish = CryptoJS.Blowfish;

export class Blowfish_Cifrar extends AlgoritmoCifrado{

    constructor() {
        super();
    }

    async cifrar(textoPlano: string, clave: string): Promise<EncryptedPayload> {
        const encrypted = Blowfish.encrypt(textoPlano, clave).toString();
        return {
            algorithm: "Blowfish",
            cipher: encrypted,
        };
    }


    async descifrar(textoCifrado: EncryptedPayload, clave: string): Promise<string> {
        const decryptedBytes = Blowfish.decrypt(textoCifrado.cipher, clave);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return decryptedText;
    }

    getAlgoritmo(): string {return "Blowfish";}
}