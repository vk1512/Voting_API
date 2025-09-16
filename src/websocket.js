export default function initWebsocket(io) {
  io.on("connection", (socket) => {
    console.log("🔌 Client connected");

    socket.on("joinPoll", (pollId) => {
      socket.join(`poll_${pollId}`);
      console.log(`Client joined poll room ${pollId}`);
    });

    socket.on("disconnect", () => console.log(" Client disconnected"));
  });
}
