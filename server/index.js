const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv/config');
const PORT = process.env.SERVER_PORT;
const session = require('express-session');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
    method: ['GET', 'Post'],
  },
});
const routes = require('./routes');
const db = require('./models/index');

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1hr
      sameSite: true,
      httpOnly: false,
    },
  })
);

app.use(routes);
io.on('connection', async (socket) => {
  console.log('someone connected' + socket.id);

  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on('newMessage', (data) => {
    console.log(data);
    io.in(roomId).emit('newMessage', data);
  });

  // Leave the room if the user closes the socket
  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected`);
    socket.leave(roomId);
  });
});
(async function bootstrap() {
  await db.sequelize
    .sync()
    .then(() => console.log('Database connected🔥🔥🔥🔥'));
  httpServer.listen(PORT, () => {
    console.log('🔥🔥🔥🔥server is running on port ' + PORT);
  });
})();
