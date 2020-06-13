import gql from "graphql-tag";

export const LISTAR_SALAS = gql`
    query {
        findAllSalas {
            id
            nombre
        }
    }`;

export const LISTAR_USUARIOS = gql`
    query ListarUsuarios($idUsuario: ID) {
        findAllUsuarios(idUsuario: $idUsuario) {
            id
            nombre
        }
    }`;

export const USUARIOS_EN_SALA = gql`
    query FindAllUsuariosEnSala($idSala: ID) {
        findAllUsuariosEnSala(idSala: $idSala) {
            id
            levantarMano
            compartirPantalla
            usuario {
                id
                nombre
            }
            sala {
                id
                nombre
            }
        }
    }`;

export const VERIFICAR_DIAGRAMA_USUARIO = gql`
    query VerificarDiagramaUsuario($idSala: ID!, $idUsuario: ID!) {
        verificarDiagramaUsuario(idSala: $idSala, idUsuario: $idUsuario) {
            diagrama {
                datos
            }
        }
    }`;