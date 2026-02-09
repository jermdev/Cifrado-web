import type { GlobalAction, GlobalState } from "./global.types";

export const initialState: GlobalState = {
  isDarkMode: false,
  isMenuVisible: false,
  isModeEncrypt: true,
  algoritmoCifradoSeleccionado: { id: "AES-CBC", label: "AES-CBC (Simétrico)" },
  
  algortimosCifradoDisponibles: [
  { id: "AES", label: "AES (Simétrico)" },
  { id: "AES-GCM", label: "AES-GCM (Simétrico)"},
  {id: "AES-CBC", label: "AES-CBC (Simétrico)"},
  { id: "RSA", label: "RSA (Asimétrico)" },
  { id: "DES", label: "DES" },
  { id: "3DES", label: "Triple DES" },
  { id: "Blowfish", label: "Blowfish" },
  ],


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

    default:
      return state;
  }
}
