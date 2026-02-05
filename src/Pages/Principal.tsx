import MenuHamburguesaButton from "../Components/MenuHamburguesaButton";
import ToogleEncryptButton from "../Components/ToogleEncryptButton";
import MenuAlgoritmosEncirptado from "../Components/MenuAlgoritmosEncirptado";

import { useRef, useEffect, useState } from "react";

import { useGlobal } from '../Hooks/useGlobalHook';

import { CifradoService } from '../Service';

function PaginaPrincipal() {
    const { state, dispatch } = useGlobal();
    const [shouldProcess, setShouldProcess] = useState(false);

    const service = new CifradoService(state.algoritmoCifradoSeleccionado.id);

    const textoArea =  useRef<HTMLTextAreaElement>(null);
    const claveCifrado = useRef<HTMLInputElement>(null);
   
    const handleEncryptDecrypt = async () => {

        
        const texto = textoArea.current?.value;
        const clave = claveCifrado.current?.value;
        
        if (!texto || !clave) return;
        
        dispatch({ type: "SET_TEXTO_PLANO", payload: texto });
        dispatch({ type: "SET_WORD_KEY", payload: clave });
        

        try {
            if (state.isModeEncrypt) {
              const cifrado = await service.cifrar(texto, clave);
              dispatch({ type: "SET_RESULTADO_ENCRIPTADO", payload: cifrado });
              console.log("Texto cifrado:", cifrado);
            } else {
                
                const descifrado = await service.descifrar((!state.resultadoEncriptado)? texto: state.resultadoEncriptado, clave);
                const decryptedPayload = {
                    algorithm: state.resultadoEncriptado!.algorithm,
                    plainText: descifrado
                };
                dispatch({ type: "SET_RESULTADO_DESENCRIPTADO", payload: decryptedPayload });
                console.log("Texto descifrado:", descifrado);
            }
        } catch (err) {
            console.error(err);
        }
        
        
        
        setShouldProcess(true);
        
        console.log("Proceso de cifrado/descifrado completado.");

    };

    useEffect(() => {

        if (!shouldProcess) return;

        if (state.resultadoEncriptado && state.isModeEncrypt) {
            textoArea.current!.value = state.resultadoEncriptado.cipher;
        }

        if (state.resultadoDesemcriptado && !state.isModeEncrypt) {
            textoArea.current!.value = state.resultadoDesemcriptado.plainText;
        }

        setShouldProcess(false);
    }, [shouldProcess]);
    
   
    return (
    <>
        <section className="principal-section">
            <form action="" className="">
                <textarea ref={textoArea} id="inputTextoPlano" className="textArea-input_output" autoFocus />
            <div className="inputs-keys">
                
                <label htmlFor="" className="Clave-cifrado-input">
                    <input ref={claveCifrado} type="text" id="inputClaveCifrado" placeholder="Clave de Cifrado" className="input-clave"/>
                </label>

                <div className="button-encrypt-decrypt-container">
                    <MenuHamburguesaButton />
                    <ToogleEncryptButton />
                    <button type="button" onClick={handleEncryptDecrypt} className="button-encrypt-decrypt">
                        {state.isModeEncrypt ? 'Cifrar' : 'Descifrar'}
                    </button>
                </div>
            </div>
            </form>
            
        
        </section>
        <MenuAlgoritmosEncirptado />
        
    </>)
};

export default PaginaPrincipal;
