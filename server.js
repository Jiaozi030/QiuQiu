const io = require('socket.io')(3000, {
  cors: {
    origin: '*', // 允许所有域名访问
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // 用户加入时广播给其他用户
  socket.on('join', (avatarUrl) => {
    socket.broadcast.emit('userJoined', socket.id, avatarUrl);
  });

  // 用户离开时广播给其他用户
  socket.on('disconnect', () => {
    socket.broadcast.emit('userLeft', socket.id);
  });

  // 广播用户的位置更新
  socket.on('positionUpdate', (position) => {
    socket.broadcast.emit('positionUpdate', socket.id, position);
  });
});

console.log('Socket.IO server is running on port 3000'); 