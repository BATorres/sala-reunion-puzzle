import gql from 'graphql-tag';

export const FIND_ALL_USUARIOS = gql`
    query BuscarUsuarios($nombre: String, $password: String) {
        usuarios(
            where: {
                AND: [
                    {
                        nombre: $nombre
                    },
                    {
                        password: $password
                    }
                ]
            }
        ) {
            id
            nombre
            esAdmin
        }
    }
`;

export const FIND_ONE_USUARIO = gql`
    query BuscarUnUsuario(
        $idUsuario: ID
    ) {
        usuario(
            where: {
                id: $idUsuario
            }
        ) {
            id
            nombre
            esAdmin
            usuariosEnSala {
                id
                sala {
                    id
                    nombre
                }
            }
            diagramasPorUsuario {
                id
                sala {
                    id
                    nombre
                }
            }
        }
    }
`;
