import type { GlobalAction, GlobalState } from "./global.types";

export const initialState: GlobalState = {
  isMenuVisible: false,
  isDarkMode: false,
  isModeEncrypt: true,
  algoritmoCifradoSeleccionado: { id: "AES-GCM", label: "aes (simetrico)" },
  
  algortimosCifradoDisponibles: [
  { id: "AES", label: "AES (Simétrico)" },
  { id: "AES-GCM", label: "AES-GCM (Simétrico)"},
  { id: "RSA", label: "RSA (Asimétrico)" },
  { id: "DES", label: "DES" },
  { id: "3DES", label: "Triple DES" },
  { id: "Blowfish", label: "Blowfish" },
  { id: "ChaCha20", label: "ChaCha20" },
  ],
  resultadoEncriptado: null,
  resultadoDesemcriptado: null,
  textoPlano: "",
  wordkey: "",
};

export function globalReducer(
  state: GlobalState,
  action: GlobalAction
): GlobalState {
  switch (action.type) {
    case "TOGGLE_VISIBLE_MENU":
      return {
        ...state,
        isMenuVisible: !state.isMenuVisible,
      };
    case "TOGGLE_MODE_ENCRYPT" :
      return {
        ...state,
        isModeEncrypt: !state.isModeEncrypt,
      }
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    case "SET_ALGORITMO_CIFRADO":
      return {
        ...state,
        algoritmoCifradoSeleccionado: action.payload,
      };
    case "SET_TEXTO_PLANO":
      return {
        ...state,
        textoPlano: action.payload,
      };
    case "SET_WORD_KEY":
      return {
        ...state,
        wordkey: action.payload,
      };
    case "SET_RESULTADO_ENCRIPTADO":
      return {
        ...state,
        resultadoEncriptado: action.payload,
      };
    case "SET_RESULTADO_DESENCRIPTADO":
      return {
        ...state,
        resultadoDesemcriptado: action.payload,
      };
    default:
      return state;
  }
}
