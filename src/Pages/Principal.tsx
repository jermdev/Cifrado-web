import MenuHamburguesaButton from "../Components/MenuHamburguesaButton";
import ToogleEncryptButton from "../Components/ToogleEncryptButton";
import MenuAlgoritmosEncirptado from "../Components/MenuAlgoritmosEncirptado";

import { useRef } from "react";

import { useGlobal } from '../Hooks/useGlobalHook';

import { CifradoService } from '../Service';

function PaginaPrincipal() {
    const { state } = useGlobal();
    

    const service = new CifradoService(state.algoritmoCifradoSeleccionado.id);

    const textoArea =  useRef<HTMLTextAreaElement>(null);
    const claveCifrado = useRef<HTMLInputElement>(null);
   
    const handleEncryptDecrypt = async () => {

        const texto = textoArea.current?.value;
        const clave = claveCifrado.current?.value;
        
        if (!texto || !clave) return;
        
        
        try {
            if (state.isModeEncrypt) {
                const cifrado = await service.cifrar(texto, clave);
                
                updateTextArea(cifrado.cipher);

                // console.log("Texto cifrado:", cifrado);
            } else {
                
                const decifrar = {
                    algorithm: state.algoritmoCifradoSeleccionado.id,
                    cipher: texto
                }
                // console.log("Texto text area:", texto);

                const descifrado = await service.descifrar(decifrar, clave);

                // console.log("Texto descifrado:", descifrado);
                updateTextArea(descifrado);
                
                
            }
        } catch (err) {
            updateTextArea("Error durante el proceso de cifrado/descifrado. /n" + (err instanceof Error ? `Detalles: ${err.message}` : ""));
            console.error(err);
        }
        

    };

    const updateTextArea = ( nuevo_texto: string) => { textoArea.current!.value = nuevo_texto;}

   
    return (
    <>
        <section className="principal-section">
            <form action="" className="">
                <div className="container">

                    <textarea ref={textoArea} id="inputTextoPlano" className="textArea-input_output" autoFocus />
                </div>
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
