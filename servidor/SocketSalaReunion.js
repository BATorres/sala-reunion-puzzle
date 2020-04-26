const io = require('./servidor').io;
const uuidv4 = require('uuidv4');

const nuevoUsuario = ({ nombre = '' } = {}) => ({
    id: uuidv4,
    nombre
});

let usuarios = {};

module.exports = (socket) => {
    console.log('Socket Id:', socket.id);

    var datosAEnviar;

    // Verificar usuario
    socket.on('verificarUsuario', (nombreUsuario, callback) => {
        if (verificarUsuario(usuarios, nombreUsuario)) {
            callback({ esUsuario: true, usuario: null})
        } else {
            callback({ esUsuario: false, usuario: nuevoUsuario({ nombre: nombreUsuario })})
        }
        console.log('callback', callback)
    });

    // Agregar usuario
    socket.on('agregarUsuario', (nombreUsuario) => {
        console.log('usuario?', nombreUsuario);
        usuarios = crearUsuario(usuarios, nombreUsuario);
        socket.usuario = nombreUsuario;
    });

    // Compartir pantalla
    socket.on('compartirPantalla', (datosPantalla) => {
        datosAEnviar = datosPantalla;
        socket.broadcast.emit('datosRecibidos', datosAEnviar)
    });
};

function crearUsuario(listaUsuarios, usuario) {
    let nuevaLista = Object.assign({}, listaUsuarios);
    nuevaLista[usuario.nombre] = usuario;
    return nuevaLista;
}

function verificarUsuario(listaUsuarios, nombreUsuario) {
    return nombreUsuario in listaUsuarios;
}