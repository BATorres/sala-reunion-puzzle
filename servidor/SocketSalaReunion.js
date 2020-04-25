const io = require('./servidor').io;

module.exports = (socket) => {
    console.log('Socket Id:', socket.id);

    var datosAEnviar;
    socket.on('compartirPantalla', (datosPantalla) => {
        datosAEnviar = datosPantalla;
        socket.broadcast.emit('datosRecibidos', datosAEnviar)
    });
};