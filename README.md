# TanStack Query Hello World

Este proyecto es una prueba básica de funcionamiento de **TanStack Query** usando React, TypeScript y Vite.
El objetivo es demostrar cómo se puede manejar una consulta asincrónica usando `useQuery`.

## ¿Qué es TanStack Query?

**TanStack Query** es una librería utilizada para manejar datos asincrónicos en aplicaciones frontend.
Su función principal es administrar el **server state**, es decir, los datos que vienen desde un servidor, API o fuente externa.

TanStack Query ayuda a manejar automáticamente:

- Estado de carga.
- Errores.
- Datos recibidos.
- Caché.
- Actualización de datos.
- Sincronización con el servidor.

Antes se conocía como **React Query**, pero actualmente forma parte del ecosistema de **TanStack**.

## ¿Qué estamos haciendo en este programa?

En esta prueba creamos una aplicación React muy sencilla que muestra un mensaje usando TanStack Query.

El mensaje es:

```txt
Hola Mundo desde TanStack Query
```

Para simular una petición a un servidor, usamos una función que retorna una promesa después de un segundo.

Mientras la información se está cargando, la aplicación muestra:

```txt
Cargando...
```

Después de un segundo, muestra:

```txt
Hola Mundo desde TanStack Query
```

## Estructura básica del proyecto

La estructura principal del proyecto es:

```txt
tanstack-query-hello/
├── src/
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

Los archivos más importantes son:

- `main.tsx`: configura TanStack Query en toda la aplicación.
- `App.tsx`: usa `useQuery` para ejecutar la consulta y mostrar el resultado.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- TanStack Query
- npm

## Instalación del proyecto

Primero se crea el proyecto con Vite:

```bash
npm create vite@latest tanstack-query-hello
```

Se seleccionan las opciones:

```txt
Framework: React
Variant: TypeScript
```

Luego se entra a la carpeta del proyecto:

```bash
cd tanstack-query-hello
```

Se instalan las dependencias:

```bash
npm install
```

Después se instala TanStack Query:

```bash
npm install @tanstack/react-query
```

## Configuración en main.tsx

En el archivo `src/main.tsx` se configura `QueryClient` y `QueryClientProvider`.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
```

## Explicación de main.tsx

En este archivo se crea una instancia de `QueryClient`.

```tsx
const queryClient = new QueryClient();
```

Esta instancia se encarga de administrar las consultas, la caché y el estado de los datos.

Luego se envuelve toda la aplicación con `QueryClientProvider`:

```tsx
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

Esto permite que cualquier componente dentro de la aplicación pueda usar TanStack Query.

## Código en App.tsx

En el archivo `src/App.tsx` se usa `useQuery`.

```tsx
import { useQuery } from "@tanstack/react-query";

function fetchHelloWorld(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hola Mundo desde TanStack Query");
    }, 1000);
  });
}

export default function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hello-world"],
    queryFn: fetchHelloWorld,
  });

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  if (error) {
    return <h1>Ocurrió un error</h1>;
  }

  return (
    <main>
      <h1>{data}</h1>
    </main>
  );
}
```

## Explicación de App.tsx

La función `fetchHelloWorld` simula una petición asincrónica.

```tsx
function fetchHelloWorld(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hola Mundo desde TanStack Query");
    }, 1000);
  });
}
```

Esta función espera un segundo y luego retorna el mensaje.

Después usamos `useQuery`:

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ["hello-world"],
  queryFn: fetchHelloWorld,
});
```

`queryKey` identifica la consulta dentro de TanStack Query.

`queryFn` es la función que se ejecuta para obtener los datos.

TanStack Query devuelve varios estados importantes:

- `data`: contiene la información obtenida.
- `isLoading`: indica si la consulta está cargando.
- `error`: contiene el error si la consulta falla.

## Cómo ejecutar el proyecto

Para ejecutar la aplicación se usa:

```bash
npm run dev
```

Luego se abre en el navegador la URL que muestra la terminal, por ejemplo:

```txt
http://localhost:5173
```

## Resultado esperado

Primero aparece en pantalla:

```txt
Cargando...
```

Después de un segundo aparece:

```txt
Hola Mundo desde TanStack Query
```

## Explicación final

Este proyecto demuestra cómo funciona TanStack Query en una aplicación React.
Aunque no estamos consumiendo una API real, el ejemplo simula una petición asincrónica usando una promesa.

La ventaja de TanStack Query es que permite manejar de forma sencilla los estados de carga, error y datos, evitando escribir demasiada lógica manual con `useEffect` y `useState`.

Este ejemplo representa la base de cómo se consumirían datos desde una API real en proyectos frontend modernos.
