import gql from "graphql-tag";

export const CREAR_SALA = gql`
    mutation CrearSala($nombre: String!) {
        crearSala(nombre: $nombre) {
            nombre
        }
    }`;

export const UNIRSE_SALA = gql`
    mutation UnirseSala($idSala: ID!, $idUsuario: ID!) {
        unirseSala(idSala: $idSala, idUsuario: $idUsuario) {
            id
        }
    }`;

export const CREAR_USUARIO = gql`
    mutation CrearUsuario($nombre: String!, $esAdmin: Boolean) {
        crearUsuario(nombre: $nombre, esAdmin: $esAdmin) {
            id
            nombre
        }
    }`;

export const ACCIONES_USUARIO_SALA = gql`
    mutation AccionesUsuarioSala($idSala: ID, $idUsuario: ID, $tipoAccion: String) {
        accionesUsuarioSala(idSala: $idSala, idUsuario: $idUsuario, tipoAccion: $tipoAccion) {
            id
        }
    }`;

export const GUARDAR_DIAGRAMA_USUARIO = gql`
    mutation GuardarDiagramaUsuario($idSala: ID!, $idUsuario: ID!, $datos: String!) {
        guardarDiagramaUsuario(datos: $datos, idSala: $idSala, idUsuario: $idUsuario) {
            id
            diagrama {
                datos
            }
            sala {
                id
            } 
            usuario {
                id
            }
        }
    }`;
