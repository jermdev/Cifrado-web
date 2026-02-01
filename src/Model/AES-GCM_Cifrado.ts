import { AlgoritmoCifrado } from "./AlgoritmoCifrado";
import type { EncryptedPayload } from "../crypto/crypto.types";


export class AESGCM_Cifrado extends AlgoritmoCifrado {
    // Implementación del cifrado AES-GCM
    constructor() {
        super();
    }

    encoder = new TextEncoder();
    decoder = new TextDecoder();
    
    private async deriveKey(password: string, salt: Uint8Array) {
        const baseKey = await crypto.subtle.importKey(
            "raw",
            this.encoder.encode(password),
            "PBKDF2",
            false,
            ["deriveKey"]
        );

        return crypto.subtle.deriveKey(
            {
            name: "PBKDF2",
            salt: new Uint8Array(salt).buffer,
            iterations: 100_000,
            hash: "SHA-256"
            },
            baseKey,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt", "decrypt"]
        );
    }

    

    async cifrar(textoPlano: string, clave: string): Promise<EncryptedPayload> {
        // Lógica de cifrado AES-GCM
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const key = await this.deriveKey(clave, salt);

        const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        this.encoder.encode(textoPlano)
        );

        return {
            algorithm: "AES-GCM",
            cipher: this.uint8ToBase64(new Uint8Array(encrypted)),
            iv: this.uint8ToBase64(iv),
            salt: this.uint8ToBase64(salt),  
        };

        
    }

    async descifrar(textoCifrado: EncryptedPayload, clave: string): Promise<string> {
        // Lógica de descifrado AES-GCM

        if ( textoCifrado.algorithm !== "AES-GCM") {
            throw new Error("Algoritmo incompatible");
        }

        if (!textoCifrado.iv || !textoCifrado.salt) {
            throw new Error("Datos incompletos para desencriptar");
        }

        const iv = this.base64ToUint8(textoCifrado.iv);
        const salt = this.base64ToUint8(textoCifrado.salt);
        const cipherData = this.base64ToUint8(textoCifrado.cipher);

        const key = await this.deriveKey(clave, salt);

        try {
            const decryptedBuffer = await crypto.subtle.decrypt(
                { name: "AES-GCM", iv: new Uint8Array(iv).buffer },
                key,
                new Uint8Array(cipherData).buffer
            );

            return new TextDecoder().decode(decryptedBuffer);

        } catch (error) {
        // ⚠️ AES-GCM lanza error si:
        // - contraseña incorrecta
        // - iv incorrecto
        // - cipher modificado
        throw new Error("No se pudo desencriptar: contraseña o datos inválidos");
        }

    }

    getNombre(): string {
        return "AES-GCM";
    }


}