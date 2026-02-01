import { createContext, useContext, useReducer } from "react";
import { globalReducer, initialState } from "./global.reducer";
import type { GlobalState, GlobalAction } from "./global.types";

type GlobalContextType = {
  state: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
