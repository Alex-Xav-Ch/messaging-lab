

const { WebSocket } = require("ws");

const socket = new WebSocket("ws://localhost:8080");

socket.on("open", () => {
  console.log("✅ Conectado al servidor");

  const mensaje = "Hola Mundo";
  socket.send(mensaje);
  console.log(`📤 Mensaje enviado: "${mensaje}"`);
});

// Recibir respuesta del servidor
socket.on("message", (data) => {
  const respuesta = data.toString();
  console.log(`📨 Respuesta del servidor: "${respuesta}"`);
  socket.close();
});

socket.on("close", () => {
  console.log("🔌 Conexión cerrada");
});

socket.on("error", (err) => {
  console.error("❌ Error:", err.message);
});