import { useGlobal } from "../Hooks/useGlobalHook";

const ToogleEncryptButton = () => {
  
  const {  dispatch, state } = useGlobal();

  const toogle_Encrypt = () => {
  dispatch({ type: "TOGGLE_MODE_ENCRYPT" });
  }
  
  const isModeEncrypt = state.isModeEncrypt; 
  
  return (
    <button type="button" onClick={toogle_Encrypt} className="MenuHamburguesa">
      {(isModeEncrypt) ? "🔓" : "🔒"}
    </button>
  );
};



export default ToogleEncryptButton;
