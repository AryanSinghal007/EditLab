const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const ACTIONS = require('./src/Actions');

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('build'));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const userSocketMap = {};
// 'Y43zTk26weenep1XAAAD' : 'Aryan S' 
// This map is in-memory and not in DB
// Server refreshed, then all data will get deleted

function getAllConnectedClients(roomId){
  // io.sockets.adapter.rooms.get(roomId) returns a map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
    return {
      socketId,
      username: userSocketMap[socketId],
    }
  });
}

io.on('connection', (socket) => {
  console.log('Socket Connected:', socket.id);

  socket.on(ACTIONS.JOIN, ({roomId, username}) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    const clients = getAllConnectedClients(roomId);
    console.log(clients);

    clients.forEach(({socketId}) => {
      // 'to' is used to notify connected clients that new user has joined
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({roomId, code}) => {
    console.log('Debug: Recieving', code);
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {
      code
    });
  });

  socket.on(ACTIONS.SYNC_CODE, ({socketId, code}) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, {
      code
    });
  });

  // before actual disconnect
  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });

    // delete that socket id from map
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));