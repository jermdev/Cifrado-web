import type { EncryptedPayload } from "../crypto/crypto.types";
export abstract class AlgoritmoCifrado {
    
    constructor() {        
    }

    /*Metodos de cifrado y descifrado*/
    abstract cifrar(textoPlano: string, clave: string): Promise<EncryptedPayload>;

    abstract descifrar(textoCifrado: EncryptedPayload, clave: string): Promise<string>;

    /*Metodo para obtener el nombre del algoritmo*/
    abstract getNombre(): string;

    uint8ToBase64(data: Uint8Array): string {
        return btoa(String.fromCharCode(...data));
    }

    base64ToUint8(base64: string): Uint8Array {
        return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    }
}
