const { io } = require("socket.io-client");  // ← importa io, NO Server

const socket = io("http://localhost:3000");   // ← conecta al servidor

socket.on("connect", () => {
  console.log("✅ Conectado al servidor, ID:", socket.id);
});

socket.on("mensaje", (data) => {
  console.log(`📨 Mensaje recibido del servidor: "${data}"`);
  socket.disconnect();
});

socket.on("disconnect", () => {
  console.log("🔌 Desconectado del servidor");
});

socket.on("connect_error", (err) => {
  console.error("❌ Error de conexión:", err.message);
});