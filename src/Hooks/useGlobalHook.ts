// useGlobal.ts
import { useContext } from "react";
import { GlobalContext } from "../context/global.context";

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal debe usarse dentro de GlobalProvider");
  }
  return context;
}
