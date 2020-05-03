const express = require('express');
const app = express();
const servidor = require('http').Server(app);
const io = module.exports.io = require('socket.io')(servidor);
const SocketSalaReunion = require('./SocketSalaReunion');

const puerto = process.env.PORT || 8081;

app.use(express.static(__dirname + '/../build'));

io.sockets.on('connection', SocketSalaReunion);

servidor.listen(puerto, () => {
   console.log('Conectado al puerto:', puerto);
});
