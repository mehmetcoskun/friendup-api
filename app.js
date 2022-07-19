const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});

const io = require('socket.io')(server);

require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');

const resolvers = require('./graphql/resolvers');

const sequelize = require('sequelize');
const User = require('./models/User');

const onlineUsers = new Map();
io.on('connection', (socket) => {
  socket.on('join', async (data) => {
    if (data) {
      // const user = await User.findByPk(data.user.id);

      // if (user) {
      //   await user.update({
      //     status: 'online',
      //   });
      // }

      onlineUsers.set(socket.id, { id: data, player: {} });
      io.emit('onlineUserCount', onlineUsers.size);
    }
  });

  socket.on('player', (data) => {
    if (Object.keys(data.player).length !== 0) {
      console.log('çalıştı');
      console.log('1:', data.player.item.id);
      socket.join(data.player.item.id);
      //get all rooms
      const rooms = io.sockets.adapter.rooms;
      console.log(rooms);

      //send a alert to this room users
      
      // var roster = io.sockets.adapter.rooms[data.player.item.id];
      // console.log('2:', roster);
      socket.in(data.player.item.id).emit('something', 'hi');
    }
    
    onlineUsers.set(data.socketId, { id: onlineUsers.get(data.socketId)?.id, player: data.player });
    console.log('Player is set');
  });

  socket.on('disconnect', async () => {
    // const user = await User.findByPk(onlineUsers.get(socket.id)?.id);

    // if (user) {
    //   await user.update({
    //     status: 'offline',
    //   });
    // }

    onlineUsers.delete(socket.id);
    io.emit('onlineUserCount', onlineUsers.size);
    console.log('User Disconnected', onlineUsers.size);
  });
});

const apolloServer = new ApolloServer({
  typeDefs: importSchema('./graphql/schema.graphql'),
  resolvers,
  context: {
    User,
    sequelize,
  },
  introspection: true,
  playground: true,
});

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: true,
      credentials: true,
    },
  });
});
