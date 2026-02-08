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

        const encryptedBytes = new Uint8Array(encrypted);

        const combined = new Uint8Array(
            salt.length + iv.length + encryptedBytes.length
        );

        combined.set(salt, 0);
        combined.set(iv, salt.length);
        combined.set(encryptedBytes, salt.length + iv.length);

        return {
            algorithm: "AES-GCM",
            cipher: this.uint8ToBase64(combined),
        };

        
    }

    async descifrar(textoCifrado: EncryptedPayload, clave: string): Promise<string> {
        // Lógica de descifrado AES-GCM

        if ( textoCifrado.algorithm !== "AES-GCM") {
            throw new Error("Algoritmo incompatible");
        }

        const data = this.base64ToUint8(textoCifrado.cipher);

        const SALT_LENGTH = 16;
        const IV_LENGTH = 12;

        
        const salt = data.slice(0, SALT_LENGTH);
        const iv = data.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
        const cipherText = data.slice(SALT_LENGTH + IV_LENGTH);

        const key = await this.deriveKey(clave, salt);

        try {
            const decryptedBuffer = await crypto.subtle.decrypt(
                { name: "AES-GCM", iv },
                key,
                cipherText
            );

            return new TextDecoder().decode(decryptedBuffer);

        } catch (error) {
        
        throw new Error("No se pudo desencriptar: contraseña o datos inválidos");
        }

    }

    getNombre(): string {
        return "AES-GCM";
    }


}