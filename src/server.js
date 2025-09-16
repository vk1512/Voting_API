import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import userRoutes from "./routes/userRoutes.js";
import pollRoutes from "./routes/pollRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import initWebsocket from "./websocket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/polls", pollRoutes);
app.use("/votes", voteRoutes(io, prisma));

// Websocket
initWebsocket(io, prisma);

app.get('/',(req,res)=>{
    res.json({msg:"got GET request"})
})

// Start server
server.listen(4000, () => {
  console.log("🚀 Server running on http://localhost:4000");
});
