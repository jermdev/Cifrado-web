# Proyecto Cifrado-Web
Aplicacion web para el Cifrado de texto plano usando algortimos modernos de Cifrado.

## Descripción

Esta herramienta web busca servir como vehiculo para llevar mensajes ocultos y pormedio de la misma decifrar mensajes.

Este proyecto fue desarrollado en React y typescript.
Utiliza Web Crypto API, y la libreria CryptoJS.

## Estado del proyecto

🚧 En desarrollo (versión temprana funcional)

- [x] Cifrado de texto
- [x] Descifrado de texto
- [X] Interfaz responsive
- [ ] Manejo de errores avanzado

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- Web Crypto API
- CSS

## Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/jermdev/Cifrado-web
   npm install
   npm run dev
   

### 6. Uso básico
Es aplicacion cuenta con dos entradas de texto principales text Area ,y un input para colocar la clave, ambos campos son inprensidibles para el
correcto cifrado, se cuenta con tres botones.
- ☰ : este abre la barra lateral donde el usuario escogera los diferentes algoritmos disponibles
- 🔒 | 🔓 : Este cambia entremodos de encriptar y desemcriptar.
- Cifrar | Decifrar : este boton desifra o desifra el mensaje.

## Estructura del proyecto
   ```bash
   src/
   ├── components/
   |   └── MenuAlgortimosEncriptado.tsx
   │   └── MenuHamburguesaButton.tsx
   │   └── ToogleEncryptButton.tsx
   ├── context/
   |   └── global.context.tsx
   |   └── global.reducer.ts
   |   └── global.types.ts
   ├── crypto/
   |   └── crypto.types.ts
   ├── Hooks/
   |   └── useGlobalHooks.ts
   ├── Model/
   |   └── 3DES_Cifrado.ts
   |   └── AES-CBC.ts
   |   └── AES-GCM_Cifrado.ts
   |   └── AlgoritmoCifrado.ts
   |   └── Blowfish_Cifrado.ts
   |   └── DES_Cifrado.ts
   |   └── index.ts
   ├── Pages/
   |   └── Principal.tsx
   ├── services/
   │   └── Cifrado.service.ts
   │   └── index.ts
   ├── styles/
   │   └── App.css
   │   └── index.css
   ├── App.tsx
   ├── main.tsx
   ├── vite-env.d.ts

## Objetivos

- Comprender el uso correcto de IV y salt en criptografía
- Aplicar buenas prácticas de cifrado en aplicaciones web
- Comprender la creacion y mantenimiento de un proyecto

## Autor

Jeremi Porras  
GitHub: https://github.com/jermdev
