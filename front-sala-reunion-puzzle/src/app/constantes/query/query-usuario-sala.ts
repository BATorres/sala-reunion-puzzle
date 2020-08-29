import gql from 'graphql-tag';

export const BUSCAR_USUARIO_SALA = gql`
    query BuscarUsuariosEnSala(
        $idSala: ID,
        $idUsuario: ID
    ) {
        usuarioSalas(
            where: {
                AND: [
                    {
                        sala: {
                            id: $idSala
                        }
                    },
                    {
                        usuario: {
                            id: $idUsuario
                        }
                    }
                ]
            }
            orderBy: createdAt_DESC
        ) {
            id
            levantarMano
            compartirPantalla
            usuario {
                id
                nombre
                esAdmin
            }
            sala {
                id
                nombre
            }
        }
    }
`;
