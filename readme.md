# 📡 Ejemplo 1 — WebSocket Nativo (ws)

> **Prueba de Concepto:** El cliente envía `"Hola Mundo"` y el servidor responde `"Hola Cliente"` usando el protocolo WebSocket puro.

---

## 📋 Tabla de Contenidos

- [¿Qué es WebSocket?](#qué-es-websocket)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Estructura de Archivos](#estructura-de-archivos)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Cómo Ejecutar](#cómo-ejecutar)
- [Flujo de Comunicación](#flujo-de-comunicación)
- [Código Explicado](#código-explicado)
- [Salida Esperada](#salida-esperada)
- [Errores Comunes](#errores-comunes)
- [Conceptos Clave](#conceptos-clave)

---

## ¿Qué es WebSocket?

WebSocket es un **protocolo de comunicación bidireccional** que opera sobre una única conexión TCP persistente. A diferencia de HTTP (que es petición/respuesta), WebSocket mantiene el canal abierto para que ambas partes puedan enviarse mensajes en cualquier momento.

```
HTTP (tradicional):          WebSocket:
Cliente → Petición           Cliente ←→ Servidor
Servidor → Respuesta         (canal siempre abierto)
(conexión cerrada)
```

La librería **`ws`** es la implementación más popular de WebSocket para Node.js: rápida, ligera y sin dependencias adicionales.

---

## Arquitectura del Proyecto

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   CLIENTE (cliente.js)    SERVIDOR (servidor.js)│
│                                                 │
│   ┌──────────┐            ┌──────────────────┐  │
│   │          │──"Hola────▶│                  │  │
│   │ WebSocket│  Mundo"    │  WebSocketServer │  │
│   │  Client  │            │   Puerto 8080    │  │
│   │          │◀──"Hola ───│                  │  │
│   └──────────┘   Cliente" └──────────────────┘  │
│                                                 │
│         ws://localhost:8080                     │
└─────────────────────────────────────────────────┘
```

---

## Estructura de Archivos

```
ejemplo1-websocket/
│
├── 📄 servidor.js      → Inicia el servidor WebSocket en el puerto 8080
├── 📄 cliente.js       → Se conecta y envía "Hola Mundo"
└── 📄 package.json     → Metadatos del proyecto y dependencias
```

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

| Herramienta | Versión mínima | Verificar con       | Descargar                        |
|-------------|----------------|---------------------|----------------------------------|
| Node.js     | v14 o superior | `node -v`           | https://nodejs.org               |
| npm         | v6 o superior  | `npm -v`            | (incluido con Node.js)           |

---

## Instalación

### Paso 1 — Entra a la carpeta del proyecto

```bash
cd ejemplo1-websocket
```

### Paso 2 — Instala las dependencias

```bash
npm install
```

Esto descarga e instala la librería `ws` (WebSocket) listada en `package.json`.

**¿Qué se instala?**

| Paquete | Versión   | Para qué sirve                              |
|---------|-----------|---------------------------------------------|
| `ws`    | `^8.18.0` | Implementación WebSocket para Node.js       |

Una vez completado verás una carpeta `node_modules/` creada automáticamente.

---

## Cómo Ejecutar

> ⚠️ **Importante:** Necesitas **dos terminales abiertas al mismo tiempo**.

### Terminal 1 — Iniciar el Servidor

```bash
node servidor.js
```

Debes ver:
```
✅ Servidor WebSocket corriendo en ws://localhost:8080
```

El servidor queda **esperando conexiones**. No lo cierres.

---

### Terminal 2 — Ejecutar el Cliente

```bash
node cliente.js
```

Debes ver:
```
✅ Conectado al servidor
📤 Mensaje enviado: "Hola Mundo"
📨 Respuesta del servidor: "Hola Cliente"
🔌 Conexión cerrada
```

Y en la Terminal 1 (servidor) aparecerá:
```
🔌 Cliente conectado
📨 Mensaje recibido: "Hola Mundo"
📤 Respuesta enviada: "Hola Cliente"
❌ Cliente desconectado
```

---

## Flujo de Comunicación

```
CLIENTE                          SERVIDOR
   │                                │
   │──── Intento de conexión ──────▶│
   │                                │  Evento: "connection"
   │◀─── Handshake completado ──────│
   │                                │
   │  Evento: "open"                │
   │──── "Hola Mundo" ────────────▶│
   │                                │  Evento: "message"
   │                                │  data = "Hola Mundo"
   │◀─── "Hola Cliente" ───────────│
   │                                │
   │  Evento: "message"             │
   │  data = "Hola Cliente"         │
   │                                │
   │──── close() ─────────────────▶│
   │                                │  Evento: "close"
   │  Evento: "close"               │
   │                                │
```

---

## Código Explicado

### `servidor.js`

```javascript
const { WebSocketServer } = require("ws");
```
Importa la clase `WebSocketServer` del paquete `ws`.

```javascript
const wss = new WebSocketServer({ port: 8080 });
```
Crea un servidor WebSocket que escucha en el puerto `8080`.

```javascript
wss.on("connection", (socket) => { ... });
```
Evento que se dispara **cada vez que un cliente se conecta**. El parámetro `socket` es la instancia individual de ese cliente.

```javascript
socket.on("message", (data) => {
  const mensaje = data.toString();
  socket.send("Hola Cliente");
});
```
Escucha los mensajes del cliente. Los datos llegan como `Buffer`, por eso se usa `.toString()`. Luego responde con `socket.send()`.

---

### `cliente.js`

```javascript
const socket = new WebSocket("ws://localhost:8080");
```
Crea una conexión al servidor. El protocolo es `ws://` (o `wss://` para versión segura con TLS).

```javascript
socket.on("open", () => {
  socket.send("Hola Mundo");
});
```
El evento `"open"` confirma que la conexión fue exitosa. Solo entonces se envía el mensaje.

```javascript
socket.on("message", (data) => {
  console.log(data.toString());
  socket.close();
});
```
Recibe la respuesta del servidor y cierra la conexión.

---

## Salida Esperada

### Terminal del Servidor
```
✅ Servidor WebSocket corriendo en ws://localhost:8080
🔌 Cliente conectado
📨 Mensaje recibido: "Hola Mundo"
📤 Respuesta enviada: "Hola Cliente"
❌ Cliente desconectado
```

### Terminal del Cliente
```
✅ Conectado al servidor
📤 Mensaje enviado: "Hola Mundo"
📨 Respuesta del servidor: "Hola Cliente"
🔌 Conexión cerrada
```

---

## Errores Comunes

### ❌ `Error: connect ECONNREFUSED 127.0.0.1:8080`

**Causa:** El cliente intentó conectarse pero el servidor no estaba corriendo.

**Solución:** Asegúrate de iniciar `servidor.js` **antes** que `cliente.js`.

---

### ❌ `Error: Cannot find module 'ws'`

**Causa:** No se instalaron las dependencias.

**Solución:**
```bash
npm install
```

---

### ❌ `Error: listen EADDRINUSE :::8080`

**Causa:** El puerto 8080 ya está en uso por otro proceso.

**Solución:** Cambia el puerto en ambos archivos:
```javascript
// servidor.js
const PORT = 9090; // Elige otro puerto libre

// cliente.js
const socket = new WebSocket("ws://localhost:9090");
```

---

## Conceptos Clave

| Término          | Significado                                                                          |
|------------------|--------------------------------------------------------------------------------------|
| `WebSocket`      | Protocolo de comunicación bidireccional y persistente sobre TCP                      |
| `ws://`          | Esquema de URL para conexiones WebSocket (sin cifrado)                               |
| `wss://`         | Esquema de URL para WebSocket seguro con TLS (equivalente a HTTPS)                   |
| `Handshake`      | Proceso inicial donde HTTP se "actualiza" a WebSocket (`Upgrade: websocket`)         |
| `socket.send()`  | Método para enviar un mensaje a través de la conexión WebSocket                      |
| `socket.close()` | Cierra la conexión de forma limpia                                                   |
| `Buffer`         | Tipo de dato en Node.js para datos binarios; los mensajes WS llegan como Buffer      |
| Puerto `8080`    | Puerto por convención para servidores WebSocket de desarrollo                        |