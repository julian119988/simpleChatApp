const app = require("express")();
const http = require("http").createServer(app);
const PORT = 8080;
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const STATIC_CHANNELS = ["global_notifications", "global_chat"];

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on("connection", (socket) => {
  /* socket object may be used to send specific messages to the new connected client */
  console.log(`new client connected ${socket.id}`);
  socket.join("room1");
  socket.on("mensaje", (mensaje) => console.log(mensaje));
  socket.on("nuevoMensaje", (msg) => {
    console.log(msg);
    socket.to("room1").emit("nuevoMensaje", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
