/*import {GraphQLServer, PubSub} from 'graphql-yoga';
import {Prisma} from 'prisma-binding';

const express = require('express');
const app = express();
const servidor = require('http').Server(app);
const io = module.exports.io = require('socket.io')(servidor);
const SocketSalaReunion = require('./SocketSalaReunion');
const esquema = require('./schema');

const puerto = process.env.PORT || 8081;

app.use(express.static(__dirname + '/../build'));

io.sockets.on('connection', SocketSalaReunion);

app.get('*', (request, response) => {
   response.sendFile(path.resolve(__dirname + '/../build'));
});

servidor.listen(puerto, () => {
   console.log('Conectado al puerto:', puerto);
});

const pubsub = new PubSub();

const server = new GraphQLServer({
   schema: esquema,
   context: ({request}) => ({
      ...request,
      db: new Prisma({
         endpoint: 'https://sala-reunion-c09c320c32.herokuapp.com/sala-reunion-puzzle/dev',
         typeDefs: '../generated/prisma-client/prisma-schema',
         debug: true,
      }),
   }),
});

server.start({
   port: puerto
}, () => {
   console.log('El servidor está conectado al puerto 8081');
});*/
