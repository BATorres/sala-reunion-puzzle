import gql from 'graphql-tag';

export const FIND_ALL_SALA = gql`
    query {
        salas(
            orderBy: createdAt_DESC
        ) {
            id
            nombre
        }
    }
`;

export const FIND_ONE = gql`
    query BuscarUnaSala(
        $idSala: ID
    ) {
        sala(
            where: {
                id: $idSala
            }
        ) {
            id
            nombre
        }
    }
`;

export const BUSCAR_SALA_POR_NOMBRE = gql`
    query BuscarSalasPorNombre(
        $nombreSala: String
    ) {
        salas(
            where: {
                nombre_contains: $nombreSala
            },
            orderBy: createdAt_DESC
        ) {
            id
            nombre
        }
    }
`;
