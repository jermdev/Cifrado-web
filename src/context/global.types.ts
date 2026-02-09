
import type {  Algorithm } from "../crypto/crypto.types"


export type AlgoritmoCifrado = {
  id: Algorithm;
  label: string;
  type?: "symmetric" | "asymmetric";
};

export type CIFRADO_OPTIONS = AlgoritmoCifrado[];



export type GlobalState = {
  isDarkMode: boolean;
  isMenuVisible: boolean;
  isModeEncrypt: boolean;
  algoritmoCifradoSeleccionado: AlgoritmoCifrado;
  algortimosCifradoDisponibles: CIFRADO_OPTIONS;
  
  
};

export type GlobalAction =
  | { type: "TOGGLE_VISIBLE_MENU" }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "SET_ALGORITMO_CIFRADO", payload: AlgoritmoCifrado }
  | { type: "TOGGLE_MODE_ENCRYPT" };

