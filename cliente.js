
const { Server } = require("socket.io");

const PORT = 3000;
const io = new Server(PORT, {
  cors: { origin: "*" }, // Permitir cualquier origen (para pruebas)
});

console.log(`✅ Servidor Socket.IO corriendo en http://localhost:${PORT}`);

io.on("connection", (socket) => {
  console.log(`🔌 Cliente conectado: ${socket.id}`);

  // Emitir mensaje al cliente recién conectado
  const mensaje = "Hola Mundo";
  socket.emit("mensaje", mensaje);
  console.log(`📤 Mensaje emitido al cliente: "${mensaje}"`);

  socket.on("disconnect", () => {
    console.log(`❌ Cliente desconectado: ${socket.id}`);
  });
});