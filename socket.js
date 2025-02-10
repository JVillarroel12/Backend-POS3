const { Server } = require("socket.io");
const { getStatus } = require("./src/models/comanda.model");

let io;

const connectIO = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Reemplaza con la URL de tu frontend en producción
      methods: ["GET", "POST"],
    },
    maxHttpBufferSize: 1e8,
    maxRequestFileSize: 1e8,
  });
  return io;
};

const initIO = (server) => {
  io = connectIO(server);

  io.on("connection", async (socket) => {
    console.log("A user connected:", socket.id);
    const comandas = await getStatus();
    socket.emit("comandas", comandas);

    socket.on("disconnect", () => {
      // Manejar la desconexión de un cliente
      console.log("A user disconnected:", socket.id);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("SocketIO not initialized!");
  }
  return io;
};

module.exports = {
  initIO,
  getIO,
  connectIO,
};
