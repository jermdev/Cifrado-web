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

        

        const encryptedBytes = new Uint8Array(encrypted);
        const combined = new Uint8Array(iv.length + encryptedBytes.length);

        combined.set(iv, 0);
        combined.set(encryptedBytes, iv.length);

        return {
        algorithm: "AES-CBC",
        cipher: this.uint8ToBase64(combined),
        
        }
    };

    async descifrar(textoCifrado: EncryptedPayload, clave: string): Promise<string> {

        const data = Uint8Array.from(atob(textoCifrado.cipher), c => c.charCodeAt(0));

        const iv = data.slice(0, 16);
        const cipherText = data.slice(16);

        const cryptoKey = await this.importKey(clave);
        try {
            const decrypted = await crypto.subtle.decrypt(
            { name: "AES-CBC", iv },
            cryptoKey,
            cipherText
            );

            return new TextDecoder().decode(decrypted);
        } catch (error) {
            console.error(error);
            return "Error al descifrar el texto. Ver consola para más detalles.";
        }
        
    }

    getNombre(): string {
        return "AES-CBC";
    }


}