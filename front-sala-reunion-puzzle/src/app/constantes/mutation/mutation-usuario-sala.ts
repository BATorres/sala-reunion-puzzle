import gql from 'graphql-tag';

export const UNIRSE_A_SALA = gql`
    mutation UnirseASala(
        $idSala: ID,
        $idUsuario: ID
    ) {
        createUsuarioSala(
            data: {
                sala: {
                    connect: {
                        id: $idSala
                    }
                },
                usuario:
                {
                    connect:
                    {
                        id: $idUsuario
                    }
                }
            }
        ) {
            id
        }
    }
`;

export const ACCIONES_USUARIO_EN_SALA = gql`
    mutation AccionesUsuarioSala(
        $idUsuarioSala: ID,
        $levantarMano: Boolean,
        $compartirPantalla: Boolean
    ) {
        updateUsuarioSala(
            where: {
                id: $idUsuarioSala
            },
            data: {
                levantarMano: $levantarMano,
                compartirPantalla: $compartirPantalla
            }
        ) {
            id
        }
    }
`;
