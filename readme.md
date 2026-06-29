# 📡 Example 1 — Native WebSocket (ws)

> **Proof of Concept:** The client sends `"Hola Mundo"` and the server replies `"Hola Cliente"` using the raw WebSocket protocol.

---

## 📋 Table of Contents

- [What is WebSocket?](#what-is-websocket)
- [Project Architecture](#project-architecture)
- [File Structure](#file-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [Communication Flow](#communication-flow)
- [Code Explained](#code-explained)
- [Expected Output](#expected-output)
- [Common Errors](#common-errors)
- [Key Concepts](#key-concepts)

---

## What is WebSocket?

WebSocket is a **bidirectional communication protocol** that operates over a single persistent TCP connection. Unlike HTTP (which is request/response), WebSocket keeps the channel open so both sides can send messages at any time.

```
HTTP (traditional):          WebSocket:
Client → Request             Client ←→ Server
Server → Response            (channel always open)
(connection closed)
```

The **`ws`** library is the most popular WebSocket implementation for Node.js: fast, lightweight, and with no additional dependencies.

---

## Project Architecture

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   CLIENT (client.js)      SERVER (server.js)    │
│                                                 │
│   ┌──────────┐            ┌──────────────────┐  │
│   │          │──"Hola────▶│                  │  │
│   │ WebSocket│  Mundo"    │  WebSocketServer │  │
│   │  Client  │            │   Port 8080      │  │
│   │          │◀──"Hola ───│                  │  │
│   └──────────┘   Cliente" └──────────────────┘  │
│                                                 │
│         ws://localhost:8080                     │
└─────────────────────────────────────────────────┘
```

---

## File Structure

```
ejemplo1-websocket/
│
├── 📄 servidor.js      → Starts the WebSocket server on port 8080
├── 📄 cliente.js       → Connects and sends "Hola Mundo"
└── 📄 package.json     → Project metadata and dependencies
```

---

## Prerequisites

Make sure you have the following installed:

| Tool    | Minimum Version | Check with | Download               |
|---------|-----------------|------------|------------------------|
| Node.js | v14 or higher   | `node -v`  | https://nodejs.org     |
| npm     | v6 or higher    | `npm -v`   | (bundled with Node.js) |

---

## Installation

### Step 1 — Enter the project folder

```bash
cd ejemplo1-websocket
```

### Step 2 — Install dependencies

```bash
npm install
```

This downloads and installs the `ws` library listed in `package.json`.

**What gets installed?**

| Package | Version   | Purpose                              |
|---------|-----------|--------------------------------------|
| `ws`    | `^8.18.0` | WebSocket implementation for Node.js |

Once complete, a `node_modules/` folder will be created automatically.

---

## How to Run

> ⚠️ **Important:** You need **two terminals open at the same time**.

### Terminal 1 — Start the Server

```bash
node servidor.js
```

You should see:
```
✅ Servidor WebSocket corriendo en ws://localhost:8080
```

The server is now **waiting for connections**. Do not close it.

---

### Terminal 2 — Run the Client

```bash
node cliente.js
```

You should see:
```
✅ Conectado al servidor
📤 Mensaje enviado: "Hola Mundo"
📨 Respuesta del servidor: "Hola Cliente"
🔌 Conexión cerrada
```

And in Terminal 1 (server):
```
🔌 Cliente conectado
📨 Mensaje recibido: "Hola Mundo"
📤 Respuesta enviada: "Hola Cliente"
❌ Cliente desconectado
```

---

## Communication Flow

```
CLIENT                           SERVER
   │                                │
   │──── Connection attempt ───────▶│
   │                                │  Event: "connection"
   │◀─── Handshake complete ────────│
   │                                │
   │  Event: "open"                 │
   │──── "Hola Mundo" ────────────▶│
   │                                │  Event: "message"
   │                                │  data = "Hola Mundo"
   │◀─── "Hola Cliente" ───────────│
   │                                │
   │  Event: "message"              │
   │  data = "Hola Cliente"         │
   │                                │
   │──── close() ─────────────────▶│
   │                                │  Event: "close"
   │  Event: "close"                │
   │                                │
```

---

## Code Explained

### `servidor.js`

```javascript
const { WebSocketServer } = require("ws");
```
Imports the `WebSocketServer` class from the `ws` package.

```javascript
const wss = new WebSocketServer({ port: 8080 });
```
Creates a WebSocket server listening on port `8080`.

```javascript
wss.on("connection", (socket) => { ... });
```
Event fired **every time a client connects**. The `socket` parameter is that client's individual instance.

```javascript
socket.on("message", (data) => {
  const mensaje = data.toString();
  socket.send("Hola Cliente");
});
```
Listens for messages from the client. Data arrives as a `Buffer`, so `.toString()` is used to read it. Then responds with `socket.send()`.

---

### `cliente.js`

```javascript
const socket = new WebSocket("ws://localhost:8080");
```
Creates a connection to the server. The protocol is `ws://` (or `wss://` for a secure TLS version).

```javascript
socket.on("open", () => {
  socket.send("Hola Mundo");
});
```
The `"open"` event confirms the connection was successful. Only then is the message sent.

```javascript
socket.on("message", (data) => {
  console.log(data.toString());
  socket.close();
});
```
Receives the server's response and closes the connection.

---

## Expected Output

### Server Terminal
```
✅ Servidor WebSocket corriendo en ws://localhost:8080
🔌 Cliente conectado
📨 Mensaje recibido: "Hola Mundo"
📤 Respuesta enviada: "Hola Cliente"
❌ Cliente desconectado
```

### Client Terminal
```
✅ Conectado al servidor
📤 Mensaje enviado: "Hola Mundo"
📨 Respuesta del servidor: "Hola Cliente"
🔌 Conexión cerrada
```

---

## Common Errors

### ❌ `Error: connect ECONNREFUSED 127.0.0.1:8080`

**Cause:** The client tried to connect but the server was not running.

**Fix:** Make sure to start `servidor.js` **before** `cliente.js`.

---

### ❌ `Error: Cannot find module 'ws'`

**Cause:** Dependencies were not installed.

**Fix:**
```bash
npm install
```

---

### ❌ `Error: listen EADDRINUSE :::8080`

**Cause:** Port 8080 is already in use by another process.

**Fix:** Change the port in both files:
```javascript
// servidor.js
const PORT = 9090; // Pick any free port

// cliente.js
const socket = new WebSocket("ws://localhost:9090");
```

---

## Key Concepts

| Term             | Meaning                                                                              |
|------------------|--------------------------------------------------------------------------------------|
| `WebSocket`      | Bidirectional, persistent communication protocol over TCP                            |
| `ws://`          | URL scheme for WebSocket connections (no encryption)                                 |
| `wss://`         | URL scheme for secure WebSocket with TLS (equivalent to HTTPS)                       |
| `Handshake`      | Initial process where HTTP is "upgraded" to WebSocket (`Upgrade: websocket`)         |
| `socket.send()`  | Method to send a message over the WebSocket connection                               |
| `socket.close()` | Gracefully closes the connection                                                     |
| `Buffer`         | Node.js data type for binary data; WebSocket messages arrive as Buffers              |
| Port `8080`      | Conventional port for development WebSocket servers                                  |