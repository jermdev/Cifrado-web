import { AlgoritmoCifrado } from "./AlgoritmoCifrado";
import type { EncryptedPayload } from "../crypto/crypto.types";

export class AESCBC_Cifrado extends AlgoritmoCifrado {
    // Implementación del cifrado AES-CBC
    constructor() {
        super();
    }
    encoder = new TextEncoder();
    decoder = new TextDecoder();


    private async importKey(key: string): Promise<CryptoKey> {
        const keyBytes = this.textToUint8(key).slice(0, 32); // 256 bits

        const hash = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(key)
        );

        return crypto.subtle.importKey(
        "raw",
        hash,
        { name: "AES-CBC" },
        false,
        ["encrypt", "decrypt"]
        );
  }

    async cifrar(textoPlano: string, clave: string): Promise<EncryptedPayload> {
        // Lógica de cifrado AES-CBC
        const iv = crypto.getRandomValues(new Uint8Array(16));  
        const cryptoKey = await this.importKey(clave);

        const encrypted = await crypto.subtle.encrypt(
            { name: "AES-CBC", iv },
            cryptoKey,
            this.encoder.encode(textoPlano)
        );

        return {
        algorithm: "AES-CBC",
        cipher: this.uint8ToBase64(new Uint8Array(encrypted)),
        iv: this.uint8ToBase64(iv)
        }
    };

    async descifrar(textoCifrado: EncryptedPayload, clave: string): Promise<string> {

        const data = Uint8Array.from(atob(textoCifrado.cipher), c => c.charCodeAt(0));

        const iv = data.slice(0, 16);
        const cipherText = data.slice(16);

        const cryptoKey = await this.importKey(clave);

        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-CBC", iv },
            cryptoKey,
            cipherText
        );

        return new TextDecoder().decode(decrypted);
    }

    getNombre(): string {
        return "AES-CBC";
    }


}