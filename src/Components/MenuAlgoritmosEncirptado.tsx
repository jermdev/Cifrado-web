import { useState } from "react";
import {useGlobal} from "../Hooks/useGlobalHook"

export default function EncryptionOptionsPanel() {
    
  const { state, dispatch } = useGlobal();
  const [selected, setSelected] = useState<string>(state.algoritmoCifradoSeleccionado.id);
  
  const isOpen = state.isMenuVisible;
  const ENCRYPTION_OPTIONS = state.algortimosCifradoDisponibles;

  if (!isOpen) {
    return null;
  }
  
  const selectOption = (id: string) => {
    setSelected(id);
  };

  const aplicarCambioDeAlgoritmo = () => {
    if (selected === state.algoritmoCifradoSeleccionado.id) return;
    
    const nuevoAlgoritmo = ENCRYPTION_OPTIONS.find((option => option.id === selected));
    
    if (nuevoAlgoritmo) {
      dispatch({ type: "SET_ALGORITMO_CIFRADO", payload: nuevoAlgoritmo });
    }
    
    setSelected(nuevoAlgoritmo!.id);
    setCloseMenu();

  }

  const setCloseMenu = () => {
    dispatch({ type: "TOGGLE_VISIBLE_MENU", });
  }


  return (
    <>
      <div className={ "overlay"} />
  

      <aside className="encryption-panel">
          {/* Header */}
        <div className="panel-header">
          <h2 >Tipos de Encriptado</h2>
          <button
            onClick={setCloseMenu}
          >
            X
          </button>
        </div >
        {/* Opciones */}
        <div className="panel-options">
          {ENCRYPTION_OPTIONS.map((option) => {
            const active = selected === option.id;
            return (
              <button
                key={option.id}
                onClick={() => selectOption(option.id)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition \
                  ${active
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"}`}
              >
                <span className="font-medium">{option.label}</span>
                {active && <span className="text-blue-600 font-bold">✓</span>}
              </button>
            );
          })}
        </div  >
        {/* Footer */}
        <div className="panel-footer">
          <button
            onClick={aplicarCambioDeAlgoritmo}
            className="w-full rounded-xl bg-black py-3 text-white font-semibold hover:bg-gray-900 transition"
          >
            Aplicar encriptado
          </button>
      
    </div>

      </aside>
      
      
    </>
    
  );
}
