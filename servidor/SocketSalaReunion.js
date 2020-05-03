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

const usuariosEnSala = [];

module.exports = (socket) => {
    console.log('Socket Id:', socket.id);

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
        salasAEnviar.unshift(socket.sala);
        socket.broadcast.emit('salasDisponibles', salasAEnviar);
    });

    // Unirse a sala
    socket.on('unirseSala', (datos) => {
        socket.join(datos.sala.idSala);
        usuariosEnSala.unshift(datos);
        io.to(datos.sala.idSala).emit('usuarioUnido', usuariosEnSala)
    });

    // Compartir pantalla
    socket.on('compartirPantalla', (datosPantalla) => {
        console.log('datos pantalla', datosPantalla);
        socket.broadcast.emit('datosRecibidos', datosPantalla)
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