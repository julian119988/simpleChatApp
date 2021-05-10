const app = require("express")();
const express = require("express");
const { normalize } = require("path");
const helmet = require("helmet");
const PORT = process.env.PORT || 8080;

app.use(express.static(normalize(__dirname + "/public")));
app.use(helmet());

app.get("/*", (req, res) => {
  console.log("lo intenot");
  res.sendFile(normalize(__dirname + "/public/index.html"));
});

var server = app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "https://simple-chat-appz.herokuapp.com/",
    methods: ["GET", "POST"],
  },
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
