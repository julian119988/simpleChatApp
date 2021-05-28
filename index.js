const app = require("express")();
const express = require("express");
const http = require("http").createServer(app);
const { normalize } = require("path");
const helmet = require("helmet");
const io = require("socket.io")(http, {
  cors: {
    origin: "https://chat-room-server.vercel.app/",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 8080;

app.use(express.static(normalize(__dirname + "/public")));
app.use(helmet());

app.get("/*", (req, res) => {
  res.sendFile(normalize(__dirname + "/public/index.html"));
});

var server = app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});

io.on("connection", (socket) => {
  socket.join("room1");
  socket.on("mensaje", (mensaje) => console.log(mensaje));

  socket.on("nuevoMensaje", (msg) => {
    socket.to("room1").emit("nuevoMensaje", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
