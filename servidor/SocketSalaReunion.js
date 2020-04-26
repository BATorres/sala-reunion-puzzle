const io = require('./servidor').io;
const { uuid } = require('uuidv4');

const nuevoUsuario = ({ nombre = '' } = {}) => ({
    id: uuid(),
    nombre
});

const nuevaSala = ({ nombre = '' } = {}) => ({
    id: uuid(),
    nombre
});

let usuarios = {};

let salas = {};

let salasAEnviar  = [];

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
    });

    // Verificar sala
    socket.on('verificarSala', (nombreSala, callback) => {
        if (verificarSala(salas, nombreSala)) {
            callback({ existeSala: true, sala: null})
        } else {
            callback({ existeSala: false, sala: nuevaSala({ nombre: nombreSala })})
        }
    });

    // Agregar usuario
    socket.on('agregarUsuario', (nombreUsuario) => {
        usuarios = crearUsuario(usuarios, nombreUsuario);
        socket.usuario = nombreUsuario;
    });

    // Crear sala
    socket.on('crearSala', (nombreSala) => {
        salas = crearSala(salas, nombreSala);
        socket.sala = nombreSala;
        salasAEnviar.unshift(socket.sala)
        socket.broadcast.emit('salasDisponibles', salasAEnviar);
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

function crearSala(listaSalas, sala) {
    let nuevaSala = Object.assign({}, listaSalas);
    nuevaSala[sala.nombre] = sala;
    return nuevaSala;
}

function verificarUsuario(listaUsuarios, nombreUsuario) {
    return nombreUsuario in listaUsuarios;
}

function verificarSala(listaSalas, nombreSala) {
    return nombreSala in listaSalas;
}