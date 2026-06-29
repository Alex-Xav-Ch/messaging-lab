
// SERVIDOR: Escucha mensajes y responde


const { WebSocketServer } = require("ws");

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`✅ Servidor WebSocket corriendo en ws://localhost:${PORT}`);

wss.on("connection", (socket) => {
  console.log("🔌 Cliente conectado");

  // Escuchar mensajes del cliente
  socket.on("message", (data) => {
    const mensaje = data.toString();
    console.log(`📨 Mensaje recibido: "${mensaje}"`);

    // Responder al cliente
    const respuesta = "Hola Cliente";
    socket.send(respuesta);
    console.log(`📤 Respuesta enviada: "${respuesta}"`);
  });

  socket.on("close", () => {
    console.log("❌ Cliente desconectado");
  });
});