import { useGlobal } from "../Hooks/useGlobalHook";

const MenuHamburguesaButton = () => {
  
  const {  dispatch } = useGlobal();

  const toogle_Encrypt = () => {
  dispatch({ type: "TOGGLE_VISIBLE_MENU" });
  }
  
  return (
    <button type="button" onClick={toogle_Encrypt} className="MenuHamburguesa">
      ☰
    </button>
  );
};



export default MenuHamburguesaButton;
