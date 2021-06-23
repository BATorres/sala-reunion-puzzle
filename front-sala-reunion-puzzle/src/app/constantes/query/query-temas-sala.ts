import gql from 'graphql-tag';

export const FIND_TEMAS_SALA = gql`
    query BuscarTemasPorSala(
        $idSala: ID
    ) {
        temaSalas(
            orderBy: createdAt_ASC
            where: {
                sala: {id: $idSala}
            }
        ) {
            id
            titulo
            fuente
            resumen
            tema
            actor
        }
    }
`;
