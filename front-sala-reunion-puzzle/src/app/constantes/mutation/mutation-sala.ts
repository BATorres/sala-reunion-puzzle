import gql from 'graphql-tag';

export const CREAR_SALA = gql`
    mutation CrearSala(
        $nombre: String!,
        $descripcion: String
    ) {
        createSala(
            data: {
                nombre: $nombre,
                descripcion: $descripcion
            }
        ) {
            id
            nombre
            descripcion
        }
    }
`;

export const ACTUALIZAR_SALA = gql`
    mutation CrearSala(
        $idSala: ID
        $temasDeSala: [TemaSalaCreateWithoutSalaInput!]
    ) {
        updateSala(
            where: {
                id: $idSala
            }
            data: {
                temasDeSala: {
                    create: $temasDeSala
                }
            }
        ) {
            id
            nombre
        }
    }
`;
