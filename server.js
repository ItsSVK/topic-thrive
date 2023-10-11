const http = require('http');
const { Server } = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io'], // Replace with your frontend URL
    // methods: ['GET', 'POST'],
    origin: '*',
    credentials: true,
  },
});

io.on('connection', socket => {
  console.log('A user connected:', socket.id);
  socket.on('join_room', roomId => {
    socket.join(roomId);
    console.log(`user with id-${socket.id} joined room - ${roomId}`);
  });

  socket.on('send_msg', data => {
    console.log(data, 'DATA');
    //This will send a message to a specific room ID
    socket.to(data.roomId).emit('receive_msg', data);
  });

  socket.on('count_updated', data => {
    console.log(data, 'DATA Updated');
    //This will send a message to a specific room ID
    socket.to(data.data.roomId).emit('count_reflect', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});

instrument(io, { auth: false });
