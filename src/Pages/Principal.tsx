import MenuHamburguesaButton from "../Components/MenuHamburguesaButton";
import ToogleEncryptButton from "../Components/ToogleEncryptButton";
import MenuAlgoritmosEncirptado from "../Components/MenuAlgoritmosEncirptado";

import { useGlobal } from '../Hooks/useGlobalHook';

import { CifradoService } from '../Service';

function PaginaPrincipal() {
    const { state, dispatch } = useGlobal();

    const service = new CifradoService(state.algoritmoCifradoSeleccionado.id);

    const recuperarInformacionDeCampos = () => {
        const textoArea = document.getElementById('inputTextoPlano') as HTMLTextAreaElement;
        const claveCifrado = document.getElementById('inputClaveCifrado') as HTMLInputElement;

        if (!textoArea.value || textoArea.value.trim().length === 0) return;
        if (!claveCifrado.value || claveCifrado.value.trim().length === 0) return;

        if(state.textoPlano === textoArea.value && state.wordkey === claveCifrado.value) return;

        dispatch({ type: "SET_TEXTO_PLANO", payload: textoArea.value });
        dispatch({ type: "SET_WORD_KEY", payload: claveCifrado.value });

        console.log(textoArea.value);
        console.log(claveCifrado.value);

        service.descifrar(resultado, "clave1234").then((resultadoDescifrado) => {
            console.log("Texto descifrado NVP:", resultadoDescifrado);
        }).catch((error) => {
            console.error("Error al descifrar:", error);
        });
    }   


    let resultado: any;
    service.cifrar("Texto de prueba :)", "clave1234").then((resultadoCifrado) => {
        console.log("Texto cifrado:", resultadoCifrado);
        resultado = resultadoCifrado;
    }).catch((error) => {
        console.error("Error al cifrar:", error);
    });


    
    
    return (
    <>
        <section className="principal-section">
            <form action="" className="">
                <textarea id="inputTextoPlano" className="textArea-input_output" autoFocus />
            <div className="inputs-keys">
                
                <label htmlFor="" className="Clave-cifrado-input">
                    <input type="text" id="inputClaveCifrado" placeholder="Clave de Cifrado" className="input-clave"/>
                </label>

                <div className="button-encrypt-decrypt-container">
                    <MenuHamburguesaButton />
                    <ToogleEncryptButton />
                    <button type="button" onClick={recuperarInformacionDeCampos} className="button-encrypt-decrypt">
                        {state.isModeEncrypt ? 'Cifrar' : 'Descifrar'}
                    </button>
                </div>
            </div>
            </form>
            
        
        </section>
        <MenuAlgoritmosEncirptado />
        
    </>)
}

export default PaginaPrincipal;
