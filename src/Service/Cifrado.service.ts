import type { Algorithm, EncryptedPayload } from '../crypto/crypto.types';
import { AlgoritmoCifrado, AESGCM_Cifrado, AESCBC_Cifrado } from "../Model";


export class CifradoService {

    private algoritmo: Algorithm;
    private AlgoritmoCifradoEntity: AlgoritmoCifrado;    

    constructor(algoritmo: Algorithm, algoritmoCifrado?: AlgoritmoCifrado) {
        this.algoritmo = algoritmo;
        this.AlgoritmoCifradoEntity = algoritmoCifrado!;
    }

    
    private seleccionarAlgoritmoCifrado(algorithm: Algorithm = this.algoritmo): void {
        // Lógica para seleccionar la implementación del algoritmo de cifrado
        // Basado en el valor de this.algoritmo
        // Ejemplo:
        
        switch (algorithm) {
            case "AES-GCM":
                this.AlgoritmoCifradoEntity = new AESGCM_Cifrado();
                break;
            case "AES-CBC":
                // this.AlgoritmoCifradoEntity = new AESCBC_Cifrado();
                this.AlgoritmoCifradoEntity = new AESCBC_Cifrado();
                break;
            default:
                throw new Error("Algoritmo no soportado");
            }
                
    }

    async cifrar(textoPlano: string, clave: string): Promise<EncryptedPayload> {
        this.seleccionarAlgoritmoCifrado();
        return this.AlgoritmoCifradoEntity.cifrar(textoPlano, clave);
    }

    async descifrar(textoCifrado: any, clave: string): Promise<string> {
        this.seleccionarAlgoritmoCifrado();
        return this.AlgoritmoCifradoEntity.descifrar(textoCifrado, clave);
    }
    
    setAlgoritmo(algoritmo: Algorithm): void {this.algoritmo = algoritmo;}
    getAlgoritmo(): string {return this.algoritmo;}

}