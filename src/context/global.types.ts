
import type { EncryptedPayload, Algorithm, DecryptedPayload } from "../crypto/crypto.types"


export type AlgoritmoCifrado = {
  id: Algorithm;
  label: string;
};

export type CIFRADO_OPTIONS = AlgoritmoCifrado[];



export type GlobalState = {
  isDarkMode: boolean;
  isMenuVisible: boolean;
  isModeEncrypt: boolean;
  algoritmoCifradoSeleccionado: AlgoritmoCifrado;
  algortimosCifradoDisponibles: CIFRADO_OPTIONS;
  textoPlano:string;
  wordkey:string;
  resultadoEncriptado: EncryptedPayload | null;
  resultadoDesemcriptado:DecryptedPayload | null;
};

export type GlobalAction =
  | { type: "TOGGLE_VISIBLE_MENU" }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "SET_ALGORITMO_CIFRADO", payload: AlgoritmoCifrado }
  | { type: "SET_TEXTO_PLANO", payload: string }
  | { type: "SET_WORD_KEY", payload: string }
  | { type: "SET_RESULTADO_ENCRIPTADO", payload: EncryptedPayload }
  | { type: "SET_RESULTADO_DESENCRIPTADO", payload: DecryptedPayload }
  | { type: "TOGGLE_MODE_ENCRYPT" };

